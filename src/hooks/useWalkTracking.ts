import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import {
  formatClockTime,
  haversineMetres,
  metresToKm,
  stepsToKm,
  todayKey,
  type LatLng,
} from '../utils/geo';

const STORAGE_KEY = 'zenvyarc.walk.today.v1';

/** Ignore GPS samples noisier than this (metres). */
const MAX_ACCURACY_M = 45;
/** Ignore tiny jitter between samples (metres). */
const MIN_MOVE_M = 3;
/** Cap single-segment jumps (teleport / tunnel glitch). */
const MAX_SEGMENT_M = 80;

export type WalkPermission = 'undetermined' | 'granted' | 'denied';

export type WalkTracking = {
  /** GPS-measured distance today (km). */
  distanceKm: number;
  /** Best available display distance: GPS if tracking, else step estimate. */
  displayKm: number;
  /** True when displayKm comes from GPS path, not step estimate. */
  fromGps: boolean;
  accuracyM: number | null;
  lastSync: string | null;
  active: boolean;
  permission: WalkPermission;
  verified: boolean;
  title: string;
  message: string;
};

type StoredWalk = {
  day: string;
  metres: number;
};

type Props = {
  steps: number;
};

export function useWalkTracking({ steps }: Props): WalkTracking {
  const [permission, setPermission] = useState<WalkPermission>('undetermined');
  const [metres, setMetres] = useState(0);
  const [accuracyM, setAccuracyM] = useState<number | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const lastPointRef = useRef<LatLng | null>(null);
  const metresRef = useRef(0);

  // Restore today's accumulated distance.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw || cancelled) {
          setHydrated(true);
          return;
        }
        const parsed = JSON.parse(raw) as StoredWalk;
        if (parsed.day === todayKey() && typeof parsed.metres === 'number') {
          metresRef.current = parsed.metres;
          setMetres(parsed.metres);
        }
      } catch {
        // ignore corrupt storage
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Persist when distance changes (after hydrate).
  useEffect(() => {
    if (!hydrated) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ day: todayKey(), metres } satisfies StoredWalk),
    ).catch(() => undefined);
  }, [metres, hydrated]);

  // Foreground GPS watch.
  useEffect(() => {
    let cancelled = false;
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (cancelled) return;

        if (status !== 'granted') {
          setPermission('denied');
          setActive(false);
          return;
        }

        setPermission('granted');
        setActive(true);

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 5,
            timeInterval: 3000,
          },
          (loc) => {
            if (cancelled) return;

            const accuracy = loc.coords.accuracy ?? null;
            setAccuracyM(accuracy);
            setLastSync(formatClockTime(new Date(loc.timestamp)));

            if (accuracy != null && accuracy > MAX_ACCURACY_M) return;

            const point: LatLng = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };

            const prev = lastPointRef.current;
            lastPointRef.current = point;
            if (!prev) return;

            const delta = haversineMetres(prev, point);
            if (delta < MIN_MOVE_M || delta > MAX_SEGMENT_M) return;

            metresRef.current += delta;
            setMetres(metresRef.current);
          },
          () => {
            if (!cancelled) setActive(false);
          },
        );
      } catch {
        if (!cancelled) {
          setPermission('denied');
          setActive(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, []);

  const distanceKm = metresToKm(metres);
  const estimatedKm = stepsToKm(steps);
  const fromGps = permission === 'granted' && metres > 0;
  const displayKm = fromGps ? distanceKm : estimatedKm;

  const verified =
    permission === 'granted' &&
    active &&
    accuracyM != null &&
    accuracyM <= MAX_ACCURACY_M;

  let title = 'WAITING FOR GPS';
  let message = 'Allow location to verify your walk.';
  if (permission === 'denied') {
    title = 'LOCATION OFF';
    message = 'Enable location to measure km walks.';
  } else if (verified && metres > 0) {
    title = 'LOCATION VERIFIED';
    message = "You're on track!";
  } else if (permission === 'granted' && active) {
    title = 'GEO-GUARD ACTIVE';
    message = 'Tracking your walk path…';
  }

  return {
    distanceKm,
    displayKm,
    fromGps,
    accuracyM,
    lastSync,
    active: permission === 'granted' && active,
    permission,
    verified,
    title,
    message,
  };
}

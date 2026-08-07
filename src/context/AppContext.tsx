import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  assignMountain,
  DEFAULT_RITUALS,
  MountainId,
  Ritual,
  STEP_GOAL,
  stepsToSumi,
} from '../data/mockData';

type User = {
  name: string;
  email: string;
  mountainId: MountainId;
};

type AppState = {
  user: User | null;
  loading: boolean;
  steps: number;
  stepGoal: number;
  sumi: number;
  rituals: Ritual[];
  hubBadge: number;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  toggleRitual: (id: string) => void;
  setSteps: (n: number) => void;
};

const AppContext = createContext<AppState | null>(null);
const STORAGE_KEY = 'zenvyarc.session.v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [steps, setSteps] = useState(7842);
  const [sumi, setSumi] = useState(12450);
  const [rituals, setRituals] = useState<Ritual[]>(DEFAULT_RITUALS);
  const hubBadge = 3;

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as { user: User; sumi: number; rituals: Ritual[] };
          setUser(parsed.user);
          setSumi(parsed.sumi ?? 12450);
          if (parsed.rituals) setRituals(parsed.rituals);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!user) return;
    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ user, sumi, rituals }),
    ).catch(() => undefined);
  }, [user, sumi, rituals]);

  const loginWithGoogle = async () => {
    const email = 'you@gmail.com';
    const mountainId = assignMountain(email + Date.now().toString());
    setUser({
      name: 'Citizen',
      email,
      mountainId,
    });
    setSumi(12450);
    setRituals(DEFAULT_RITUALS);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const toggleRitual = (id: string) => {
    setRituals((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)),
    );
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      steps,
      stepGoal: STEP_GOAL,
      sumi,
      rituals,
      hubBadge,
      loginWithGoogle,
      logout,
      toggleRitual,
      setSteps,
    }),
    [user, loading, steps, sumi, rituals],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function useTodaySumi(steps: number) {
  return stepsToSumi(steps);
}

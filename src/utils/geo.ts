/** Earth radius in metres (WGS84 mean). */
const EARTH_RADIUS_M = 6_371_000;

/** Average adult stride used when estimating km from steps only. */
export const METRES_PER_STEP = 0.78;

export type LatLng = {
  latitude: number;
  longitude: number;
};

/** Haversine distance between two WGS84 points, in metres. */
export function haversineMetres(a: LatLng, b: LatLng): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function metresToKm(metres: number): number {
  return metres / 1000;
}

export function stepsToKm(steps: number): number {
  return metresToKm(steps * METRES_PER_STEP);
}

export function formatKm(km: number, digits = 2): string {
  if (!Number.isFinite(km) || km < 0) return '0.00';
  if (km < 0.01 && km > 0) return km.toFixed(3);
  return km.toFixed(digits);
}

export function formatClockTime(date = new Date()): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/** Local calendar day key for daily walk resets (YYYY-MM-DD). */
export function todayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

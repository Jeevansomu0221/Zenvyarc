export type MountainId = 'crimson' | 'azure' | 'emerald' | 'golden';

export type Mountain = {
  id: MountainId;
  name: string;
  tagline: string;
  color: string;
  softColor: string;
  score: number;
};

export type Ritual = {
  id: string;
  name: string;
  target: string;
  done: boolean;
};

export const MOUNTAINS: Mountain[] = [
  {
    id: 'crimson',
    name: 'Crimson Peak',
    tagline: 'Mountain of Strength',
    color: '#C62828',
    softColor: '#E53935',
    score: 72450,
  },
  {
    id: 'azure',
    name: 'Azure Peak',
    tagline: 'Mountain of Focus',
    color: '#1E6FBF',
    softColor: '#42A5F5',
    score: 68120,
  },
  {
    id: 'emerald',
    name: 'Emerald Peak',
    tagline: 'Mountain of Growth',
    color: '#2E7D4F',
    softColor: '#43A047',
    score: 54890,
  },
  {
    id: 'golden',
    name: 'Golden Peak',
    tagline: 'Mountain of Wisdom',
    color: '#C9A227',
    softColor: '#F0C94A',
    score: 46230,
  },
];

export const STEP_GOAL = 10000;
export const SUMI_PER_1000_STEPS = 10;

export const DEFAULT_RITUALS: Ritual[] = [
  { id: 'water', name: 'Water', target: '3 Liters', done: true },
  { id: 'study', name: 'Study', target: '2 Hours', done: true },
  { id: 'meditation', name: 'Meditation', target: '10 Minutes', done: false },
  { id: 'training', name: 'Training', target: 'Workout', done: false },
  { id: 'reading', name: 'Reading', target: '20 Pages', done: false },
  { id: 'sleep', name: 'Sleep', target: '7+ Hours', done: true },
  { id: 'reflection', name: 'Reflection', target: '5 Minutes', done: false },
];

export const RIVALRY = {
  left: { mountainId: 'crimson' as MountainId, score: 68420 },
  right: { mountainId: 'azure' as MountainId, score: 64810 },
  remaining: '2D 14H REMAINING',
};

export const BEACON = {
  charged: 72,
  leadingMountainId: 'crimson' as MountainId,
  userContributionSteps: 18450,
  userRank: 142,
  chronicle: [
    { name: 'Arjun.s', steps: 26450, mountainId: 'crimson' as MountainId },
    { name: 'Vedant_19', steps: 21870, mountainId: 'azure' as MountainId },
    { name: 'Ritika07', steps: 18920, mountainId: 'emerald' as MountainId },
    { name: 'Karan.fit', steps: 16320, mountainId: 'golden' as MountainId },
    { name: 'Meera.walks', steps: 15780, mountainId: 'crimson' as MountainId },
  ],
  monthlyWinners: [
    { month: 'May', mountainId: 'crimson' as MountainId, pct: 31 },
    { month: 'Apr', mountainId: 'azure' as MountainId, pct: 28 },
    { month: 'Mar', mountainId: 'crimson' as MountainId, pct: 34 },
    { month: 'Feb', mountainId: 'emerald' as MountainId, pct: 27 },
    { month: 'Jan', mountainId: 'golden' as MountainId, pct: 29 },
  ],
};

export const CITY = {
  progressPct: 68,
  subscribers: 10245,
  goal: 15000,
  nextUnlock: 'Emerald Gate',
  residence: {
    name: 'Acolyte Apartments',
    detail: 'Level 2 • Block A',
    buffs: ['+10% SUMI Yield', 'Access to Writs', 'Ritual Slots +2'],
  },
  districts: [
    { id: 'sovereign', label: 'Sovereign District', position: 'top' },
    { id: 'guardian', label: 'Guardian District', position: 'mid' },
    { id: 'acolyte', label: 'Acolyte District', position: 'low' },
    { id: 'citizen', label: 'Citizen Quarters', position: 'base' },
  ],
  explore: [
    { id: 'marketplace', name: 'Marketplace', icon: '⚖️' },
    { id: 'arena', name: 'Training Arena', icon: '⚔️' },
    { id: 'library', name: 'Library', icon: '📖' },
    { id: 'garden', name: 'Zen Garden', icon: '🌳' },
    { id: 'exchange', name: 'Sumi Exchange', icon: '🪙' },
  ],
};

export const WRITS = {
  active: [
    {
      id: '1',
      opponent: 'Vedant_19',
      duration: 'Weekly Writ',
      stake: 250,
      mySteps: 18200,
      theirSteps: 16940,
      remaining: '4D 6H',
    },
  ],
  pending: [
    {
      id: '2',
      opponent: 'Ritika07',
      duration: 'Sprint Writ',
      stake: 100,
      remaining: '18H to accept',
    },
  ],
};

export function assignMountain(seed: string): MountainId {
  const ids: MountainId[] = ['crimson', 'azure', 'emerald', 'golden'];
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash + seed.charCodeAt(i) * (i + 1)) % 997;
  }
  return ids[hash % ids.length];
}

export function getMountain(id: MountainId): Mountain {
  return MOUNTAINS.find((m) => m.id === id)!;
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export function stepsToSumi(steps: number): number {
  return Math.floor((steps / 1000) * SUMI_PER_1000_STEPS);
}

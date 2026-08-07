import { useEffect } from 'react';
import { Pedometer } from 'expo-sensors';
import { useApp } from '../context/AppContext';

/** Auto-tracks today's steps via device pedometer when available. */
export function useStepTracking() {
  const { setSteps, steps } = useApp();

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;
    let cancelled = false;
    let baseline = 0;

    (async () => {
      try {
        const available = await Pedometer.isAvailableAsync();
        if (!available || cancelled) return;

        const end = new Date();
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const result = await Pedometer.getStepCountAsync(start, end);
        if (!cancelled && result?.steps != null) {
          baseline = result.steps;
          setSteps(result.steps);
        }

        subscription = Pedometer.watchStepCount((event) => {
          setSteps(baseline + event.steps);
        });
      } catch {
        // Simulator / web / permission denied → keep mock steps.
      }
    })();

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [setSteps]);

  return steps;
}

/**
 * Countdown math, kept free of DOM code so it can be tested on its own.
 *
 * Midnight on January 1 in New York is always Eastern Standard Time (UTC−5),
 * because daylight saving time is never in effect in January.
 */
const NEW_YEAR_UTC_HOUR = 5;
const CELEBRATION_MS = 24 * 60 * 60 * 1000;

/** The calendar year it currently is in New York. */
export function newYorkYear(now: Date): number {
  return Number(
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric' }).format(now),
  );
}

/** The exact instant of midnight, January 1 of `year`, in New York. */
export function newYearInstant(year: number): Date {
  return new Date(Date.UTC(year, 0, 1, NEW_YEAR_UTC_HOUR));
}

export type CountdownState =
  | { kind: 'counting'; targetYear: number; days: number; hours: number; minutes: number; seconds: number; totalMs: number }
  | { kind: 'celebrating'; year: number };

export function countdownState(now: Date): CountdownState {
  const year = newYorkYear(now);
  const sinceMidnight = now.getTime() - newYearInstant(year).getTime();
  if (sinceMidnight >= 0 && sinceMidnight < CELEBRATION_MS) {
    return { kind: 'celebrating', year };
  }
  const targetYear = year + 1;
  const totalMs = Math.max(0, newYearInstant(targetYear).getTime() - now.getTime());
  const totalSeconds = Math.floor(totalMs / 1000);
  return {
    kind: 'counting',
    targetYear,
    totalMs,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

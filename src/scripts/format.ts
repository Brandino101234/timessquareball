/** Formatting helpers shared by pages. */

/** "2025-12-30" or a Date → "December 30, 2025" (dates are calendar days, so UTC is used). */
export function formatDate(value: string | Date, style: 'long' | 'short' = 'long'): string {
  const date = typeof value === 'string' ? new Date(`${value}T00:00:00Z`) : value;
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/** "2025-12-30" or a Date → "2025-12-30", for <time datetime>. */
export function isoDate(value: string | Date): string {
  return typeof value === 'string' ? value : value.toISOString().slice(0, 10);
}

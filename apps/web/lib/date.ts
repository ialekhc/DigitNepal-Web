export function formatDateUTC(input: string | Date) {
  const date = typeof input === 'string' ? new Date(input) : input;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

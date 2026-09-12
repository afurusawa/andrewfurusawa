/** ISO `YYYY-MM-DD` to a GeoCities `M/D/YY` stamp. No Date(), so no TZ shift. */
export function kitschDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);

  if (!match) {
    return iso;
  }

  return `${Number(match[2])}/${Number(match[3])}/${match[1].slice(2)}`;
}

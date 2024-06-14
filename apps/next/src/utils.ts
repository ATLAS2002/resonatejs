export const bound = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

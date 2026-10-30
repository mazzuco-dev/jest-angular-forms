export interface ValueMatcherContext {
  equals(actual: unknown, expected: unknown): boolean;
}

export function formatValue(value: unknown): string {
  return JSON.stringify(value) ?? String(value);
}

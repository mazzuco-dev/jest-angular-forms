export function normalizePaths(paths: Array<string | string[]>): string[] {
  return paths.flat();
}

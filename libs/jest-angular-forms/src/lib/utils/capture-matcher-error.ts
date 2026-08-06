export function captureMatcherError(callback: () => void): string {
  let thrownError: unknown;

  try {
    callback();
  } catch (error) {
    thrownError = error;
  }

  return (thrownError as Error).message;
}

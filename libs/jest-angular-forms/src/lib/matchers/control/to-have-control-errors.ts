import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';

export function toHaveControlErrors(
  received: unknown,
  path: string,
  ...errors: string[]
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveControlErrors');
  const control = getControl(form, path);
  if (!control) {
    return { pass: false, message: () => `Expected control "${path}" to exist.` };
  }
  if (errors.length === 0) {
    return { pass: false, message: () => 'Expected at least one error name.' };
  }
  const missing = errors.filter((error) => !control.hasError(error));
  const pass = missing.length === 0;
  return {
    pass,
    message: () =>
      pass
        ? `Expected control "${path}" not to have all errors: ${errors.join(', ')}.`
        : `Expected control "${path}" to have errors: ${missing.join(', ')}.`,
  };
}

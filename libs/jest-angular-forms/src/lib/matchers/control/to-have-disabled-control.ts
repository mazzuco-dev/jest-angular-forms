import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';

export function toHaveDisabledControl(received: unknown, path: string): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveDisabledControl');
  const control = getControl(form, path);
  if (!control) {
    return { pass: false, message: () => `Expected control "${path}" to exist.` };
  }
  const pass = control.disabled;
  return {
    pass,
    message: () => `Expected control "${path}" ${pass ? 'not ' : ''}to be disabled.`,
  };
}

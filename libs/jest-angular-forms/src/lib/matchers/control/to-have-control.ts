import { ensureFormGroup } from '../../utils/ensure-form-group';
import { MatcherResult } from '../../types/matcher-result';
import { getControl } from '../../utils/get-control';

export function toHaveControl(received: unknown, path: string): MatcherResult {
  const matcher = 'toHaveControl';

  const form = ensureFormGroup(received, matcher);

  const control = getControl(form, path);
  const pass = control !== null;

  return {
    pass,
    message: () =>
      pass
        ? `Expected form not to have control "${path}".`
        : `Expected form to have control "${path}".`,
  };
}

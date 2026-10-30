import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';

export function toHaveFormError(received: unknown, error: string): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveFormError');
  const pass = form.hasError(error);
  return {
    pass,
    message: () => `Expected form ${pass ? 'not ' : ''}to have error "${error}".`,
  };
}

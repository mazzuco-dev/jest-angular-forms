import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';

export function toBeValidForm(received: unknown): MatcherResult {
  const form = ensureFormGroup(received, 'toBeValidForm');
  const pass = form.valid;
  return {
    pass,
    message: () => `Expected form ${pass ? 'not ' : ''}to be valid; status is ${form.status}.`,
  };
}

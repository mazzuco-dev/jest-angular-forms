import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';

export function toBeInvalidForm(received: unknown): MatcherResult {
  const form = ensureFormGroup(received, 'toBeInvalidForm');
  const pass = form.invalid;
  return {
    pass,
    message: () => `Expected form ${pass ? 'not ' : ''}to be invalid; status is ${form.status}.`,
  };
}

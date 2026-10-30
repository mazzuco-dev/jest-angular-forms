import { ValidatorFn } from '@angular/forms';
import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';

export function toHaveValidators(
  received: unknown,
  path: string,
  ...validators: ValidatorFn[]
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveValidators');
  const control = getControl(form, path);
  if (!control) {
    return { pass: false, message: () => `Expected control "${path}" to exist.` };
  }
  if (validators.length === 0) {
    return { pass: false, message: () => 'Expected at least one validator.' };
  }
  const pass = validators.every((validator) => control.hasValidator(validator));
  return {
    pass,
    message: () =>
      pass
        ? `Expected control "${path}" not to have all provided validators.`
        : `Expected control "${path}" to have all provided validators.`,
  };
}

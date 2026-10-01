import { ValidatorFn } from '@angular/forms';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';

export function toHaveValidator(
  received: unknown,
  path: string,
  validator: ValidatorFn,
) {
  const form = ensureFormGroup(received, 'toHaveValidator');

  const control = getControl(form, path);

  if (!control) {
    return {
      pass: false,
      message: () => `Expected control "${path}" to exist.`,
    };
  }

  const pass = control.hasValidator(validator);

  return {
    pass,
    message: () =>
      pass
        ? `Expected control "${path}" not to have the provided validator.`
        : `Expected control "${path}" to have the provided validator.`,
  };
}

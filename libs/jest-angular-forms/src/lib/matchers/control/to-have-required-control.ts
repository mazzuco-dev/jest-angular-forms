import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';
import { Validators } from '@angular/forms';
import { MatcherResult } from '../../types/matcher-result';

export function toHaveRequiredControl(
  received: unknown,
  path: string,
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveRequiredControl');

  const control = getControl(form, path);

  if (!control) {
    return {
      pass: false,
      message: () =>
        `Expected form to have required control "${path}", but the control does not exist.`,
    };
  }

  const pass = control.hasValidator(Validators.required);

  return {
    pass,
    message: () =>
      pass
        ? `Expected control "${path}" not to be required.`
        : `Expected control "${path}" to be required.`,
  };
}

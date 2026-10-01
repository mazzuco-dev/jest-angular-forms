import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';

export function toHaveControlError(received: unknown, path: string, error: string) {
  const form = ensureFormGroup(received, 'toHaveControlError');

  const control = getControl(form, path);

  if (!control) {
    return {
      pass: false,
      message: () => `Expected control "${path}" to exist.`,
    };
  }

  const pass = control.hasError(error);

  return {
    pass,

    message: () =>
      pass
        ? `Expected control "${path}" not to have error "${error}".`
        : `Expected control "${path}" to have error "${error}".`,
  };
}

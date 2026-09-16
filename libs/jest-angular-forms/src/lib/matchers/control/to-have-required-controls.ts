import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';
import { MatcherResult } from '../../types/matcher-result';
import { normalizePaths } from '../../utils/normalize-paths';
import { Validators } from '@angular/forms';

export function toHaveRequiredControls(
  received: unknown,
  ...receivedPaths: Array<string | string[]>
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveRequiredControls');

  const paths = normalizePaths(receivedPaths);

  const invalidControls = paths.filter((path) => {
    const control = getControl(form, path);
    return !control || !control.hasValidator(Validators.required);
  });

  const pass = invalidControls.length === 0;

  return {
    pass,
    message: () =>
      pass
        ? `Expected controls not to be required: ${paths.join(', ')}.`
        : `Expected controls to be required: ${invalidControls.join(', ')}.`,
  };
}

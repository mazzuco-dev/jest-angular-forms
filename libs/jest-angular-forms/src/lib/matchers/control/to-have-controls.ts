import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { normalizePaths } from '../../utils/normalize-paths';
import { getControl } from '../../utils/get-control';

export function toHaveControls(
  received: unknown,
  ...receivedPaths: Array<string | string[]>
): MatcherResult {
  const matcher = 'toHaveControls';
  const form = ensureFormGroup(received, matcher);

  const paths = normalizePaths(receivedPaths);

  const missingControls = paths.filter(
    (path) => getControl(form, path) === null,
  );

  const pass = missingControls.length === 0;

  return {
    pass,
    message: () =>
      pass
        ? `Expected form not to have controls: ${paths.join(', ')}.`
        : `Expected form to have controls: ${missingControls.join(', ')}.`,
  };
}

import type { MatcherFunction } from 'expect';
import {
  ensureFormGroup,
  getFormGroupControls,
  hasControl,
  matcherMessage,
} from '../utils';

export const toHaveControl: MatcherFunction<[path: string]> = function (
  received,
  path,
) {
  const formResult = ensureFormGroup(received);
  const matcher = 'toHaveControl';

  if (!formResult.success) {
    return matcherMessage(this, {
      matcher,
      received,
      pass: false,
      expected: 'Angular FormGroup',
      positiveMessage: 'Expected received value to be an Angular FormGroup.',
      negativeMessage:
        'Expected received value not to be an Angular FormGroup.',
    });
  }

  const controlPaths = getFormGroupControls(formResult.form, path);

  const pass = hasControl(formResult.form, path);

  return matcherMessage(this, {
    pass,
    matcher,
    expected: path,
    received: controlPaths,
    positiveMessage: `Expected form to contain control "${path}".`,
    negativeMessage: `Expected form not to contain control "${path}".`,
  });
};

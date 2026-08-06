import { MatcherFunction } from 'expect';
import {
  ControlPath,
  ensureFormGroup,
  hasControl,
  matcherMessage,
} from '../utils';

export const toHaveControls: MatcherFunction<ControlPath[]> =
  function (received, ...paths) {
    const formResult = ensureFormGroup(received);
    const matcher = 'toHaveControls';

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

    if (paths.length === 0) {
      return matcherMessage(this, {
        matcher,
        pass: false,
        expected: 'at least one control path',
        received: paths,
        positiveMessage: 'Expected at least one control path.',
        negativeMessage: 'Expected no control paths.',
      });
    }

    const missingControls = paths.filter(
      (path) => !hasControl(formResult.form, path),
    );

    const controlPaths = Object.keys(formResult.form.controls);

    const pass = missingControls.length === 0;

    return matcherMessage(this, {
      pass,
      matcher,
      expected: paths,
      received: controlPaths,
      positiveMessage:
        'Expected the form not to contain all specified controls.',
      negativeMessage: 'Expected the form to contain all specified controls.',
    });
  };

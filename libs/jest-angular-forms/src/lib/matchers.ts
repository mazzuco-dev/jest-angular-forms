import { toHaveControl } from './matchers/control/to-have-control';
import { toHaveControls } from './matchers/control/to-have-controls';

export const angularFormMatchers = {
  toHaveControl,
  toHaveControls,
};

export type AngularFormMatchers = typeof angularFormMatchers;

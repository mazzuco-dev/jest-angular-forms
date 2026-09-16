import { toHaveControl } from './matchers/control/to-have-control';
import { toHaveControls } from './matchers/control/to-have-controls';
import { toHaveRequiredControl } from './matchers/control/to-have-required-control';
import { toHaveRequiredControls } from './matchers/control/to-have-required-controls';

export const angularFormMatchers = {
  toHaveControl,
  toHaveControls,
  toHaveRequiredControl,
  toHaveRequiredControls,
};

export type AngularFormMatchers = typeof angularFormMatchers;

import { toHaveControl } from './matchers/control/to-have-control';
import { toHaveControls } from './matchers/control/to-have-controls';
import { toHaveRequiredControl } from './matchers/control/to-have-required-control';
import { toHaveRequiredControls } from './matchers/control/to-have-required-controls';
import { toHaveValidator } from './matchers/control/to-have-validator';
import { toHaveControlError } from './matchers/control/to-have-control-error';
import { toValueEqual } from './matchers/control/to-value-equal';

export const angularFormMatchers = {
  toHaveControl,
  toHaveControls,
  toHaveControlError,
  toHaveRequiredControl,
  toHaveRequiredControls,
  toHaveValidator,
  toValueEqual,
};

export type AngularFormMatchers = typeof angularFormMatchers;

import { toHaveControl } from './matchers/control/to-have-control';
import { toHaveControls } from './matchers/control/to-have-controls';
import { toHaveRequiredControl } from './matchers/control/to-have-required-control';
import { toHaveRequiredControls } from './matchers/control/to-have-required-controls';
import { toHaveValidator } from './matchers/control/to-have-validator';
import { toHaveControlError } from './matchers/control/to-have-control-error';
import { toHaveValidators } from './matchers/control/to-have-validators';
import { toHaveControlErrors } from './matchers/control/to-have-control-errors';
import { toHaveControlValue } from './matchers/control/to-have-control-value';
import { toHaveEnabledControl } from './matchers/control/to-have-enabled-control';
import { toHaveDisabledControl } from './matchers/control/to-have-disabled-control';
import { toBeValidForm } from './matchers/form/to-be-valid-form';
import { toBeInvalidForm } from './matchers/form/to-be-invalid-form';
import { toHaveFormError } from './matchers/form/to-have-form-error';
import { toHaveFormValue } from './matchers/form/to-have-form-value';
import { toHaveRawValue } from './matchers/form/to-have-raw-value';

export const angularFormMatchers = {
  toHaveControl,
  toHaveControls,
  toHaveControlError,
  toHaveRequiredControl,
  toHaveRequiredControls,
  toHaveValidator,
  toHaveValidators,
  toHaveControlErrors,
  toHaveControlValue,
  toHaveEnabledControl,
  toHaveDisabledControl,
  toBeValidForm,
  toBeInvalidForm,
  toHaveFormError,
  toHaveFormValue,
  toHaveRawValue,
};

export type AngularFormMatchers = typeof angularFormMatchers;

import { ValidatorFn } from '@angular/forms';

declare global {
  // Jest's global expect is declared through this namespace by @types/jest.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveControl(path: string): R;
      toHaveControls(...paths: Array<string | string[]>): R;
      toHaveControlError(path: string, error: string): R;
      toHaveRequiredControl(path: string): R;
      toHaveRequiredControls(...paths: Array<string | string[]>): R;
      toHaveValidator(path: string, validator: ValidatorFn): R;
      toHaveValidators(path: string, ...validators: ValidatorFn[]): R;
      toHaveControlErrors(path: string, ...errors: string[]): R;
      toHaveControlValue(path: string, expected: unknown): R;
      toHaveEnabledControl(path: string): R;
      toHaveDisabledControl(path: string): R;
      toBeValidForm(): R;
      toBeInvalidForm(): R;
      toHaveFormError(error: string): R;
      toHaveFormValue(expected: unknown): R;
      toHaveRawValue(expected: unknown): R;
    }
  }
}

declare module 'expect' {
  interface Matchers<R> {
    toHaveControl(path: string): R;
    toHaveControls(...paths: Array<string | string[]>): R;
    toHaveControlError(path: string, error: string): R;
    toHaveRequiredControl(path: string): R;
    toHaveRequiredControls(...paths: Array<string | string[]>): R;
    toHaveValidator(path: string, validator: ValidatorFn): R;
    toHaveValidators(path: string, ...validators: ValidatorFn[]): R;
    toHaveControlErrors(path: string, ...errors: string[]): R;
    toHaveControlValue(path: string, expected: unknown): R;
    toHaveEnabledControl(path: string): R;
    toHaveDisabledControl(path: string): R;
    toBeValidForm(): R;
    toBeInvalidForm(): R;
    toHaveFormError(error: string): R;
    toHaveFormValue(expected: unknown): R;
    toHaveRawValue(expected: unknown): R;
  }
}

export {};

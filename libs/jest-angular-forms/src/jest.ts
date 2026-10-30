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
      toValueEqual(received: unknown): R;
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
    toValueEqual(received: unknown): R;
  }
}

export {};

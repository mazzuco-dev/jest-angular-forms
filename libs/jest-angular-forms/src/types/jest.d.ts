import { ControlPath } from '../lib/utils';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveControl(path: string): R;
      toHaveControls(...paths: ControlPath[]): R;
    }
  }
}

declare module 'expect' {
  interface Matchers<R> {
    toHaveControl(path: string): R;
    toHaveControls(...paths: ControlPath[]): R;
  }
}

export {};

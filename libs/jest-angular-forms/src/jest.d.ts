declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveControl(path: string): R;
      toHaveControls(...paths: Array<string | string[]>): R;
      toHaveRequiredControl(path: string): R;
      toHaveRequiredControls(...paths: Array<string | string[]>): R;
    }
  }
}

declare module 'expect' {
  interface Matchers<R> {
    toHaveControl(path: string): R;
    toHaveControls(...paths: Array<string | string[]>): R;
    toHaveRequiredControl(path: string): R;
    toHaveRequiredControls(...paths: Array<string | string[]>): R;
  }
}

export {};

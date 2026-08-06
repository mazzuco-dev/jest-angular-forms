import { toHaveControl, toHaveControls } from './structure';

export const angularFormMatchers = {
  toHaveControl,
  toHaveControls,
};

export type AngularFormMatchers = typeof angularFormMatchers;

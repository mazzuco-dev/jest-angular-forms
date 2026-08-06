import { expect } from '@jest/globals';
import { angularFormMatchers } from './lib/matchers';

export function registerAngularFormMatchers() {
  expect.extend(angularFormMatchers);
}

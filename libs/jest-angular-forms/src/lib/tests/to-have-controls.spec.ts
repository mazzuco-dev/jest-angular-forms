import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { expect } from '@jest/globals';
import { registerAngularFormMatchers } from '../../setup';
import { captureMatcherError } from '../utils';

registerAngularFormMatchers();

describe('toHaveControls', () => {
  it('should pass when all controls exist', () => {
    const form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      rememberMe: new FormControl(false),
    });

    expect(form).toHaveControls('email', 'password', 'rememberMe');
  });

  it('should fail when one of the controls does not exist', () => {
    const form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    expect(() => {
      expect(form).toHaveControls('email', 'password', 'rememberMe');
    }).toThrow();
  });

  it('should report the missing controls', () => {
    const form = new FormGroup({
      password: new FormControl(''),
    });

    const message = captureMatcherError(() => {
      expect(form).toHaveControls('email', 'password', 'rememberMe');
    });

    expect(message).toContain(
      'Expected the form not to contain all specified controls',
    );

    expect(message).toContain('email');
    expect(message).toContain('rememberMe');
  });

  it('should support nested FormGroup paths', () => {
    const form = new FormGroup({
      profile: new FormGroup({
        name: new FormControl(''),
        address: new FormGroup({
          city: new FormControl(''),
        }),
      }),
    });

    expect(form).toHaveControls('profile.name', 'profile.address.city');
  });

  it('should support FormArray paths', () => {
    const form = new FormGroup({
      addresses: new FormArray([
        new FormGroup({
          street: new FormControl(''),
          city: new FormControl(''),
        }),
      ]),
    });

    expect(form).toHaveControls('addresses.0.street', 'addresses.0.city');
  });

  it('should pass with not when at least one control is missing', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    expect(form).not.toHaveControls('email', 'password');
  });

  it('should fail with not when all controls exist', () => {
    const form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    expect(() => {
      expect(form).not.toHaveControls('email', 'password');
    }).toThrow();
  });

  it('should fail when received value is not a FormGroup', () => {
    expect(() => {
      expect({}).toHaveControls('email', 'password');
    }).toThrow();
  });

  it('should return a descriptive error for invalid received value', () => {
    const message = captureMatcherError(() => {
      expect(null).toHaveControls('email');
    });

    expect(message).toContain(
      'Expected received value to be an Angular FormGroup.',
    );
  });
});

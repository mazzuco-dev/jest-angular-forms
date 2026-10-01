import { registerAngularFormMatchers } from '../../setup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { captureMatcherError } from '../utils/capture-matcher-error';

registerAngularFormMatchers();

describe('toValueEqual', () => {
  it('should pass when the form contains the value', () => {
    const form = new FormGroup({
      email: new FormControl('test@email', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('test123', Validators.required),
      rememberMe: new FormControl(false),
      date: new FormControl(new Date('2020-01-01T00:00:00.000Z')),
    });

    expect(form).toValueEqual({
      email: 'test@email',
      password: 'test123',
      rememberMe: false,
      date: new Date('2020-01-01T00:00:00.000Z'),
    });
  });
});

describe('toValueEqual', () => {
  it('should fail when the form not contains the value', () => {
    const form = new FormGroup({
      email: new FormControl('test@email', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('test', Validators.required),
    });

    const message = captureMatcherError(() => {
      expect(form).toValueEqual({
        email: 'test@email',
        password: 'test123',
      });
    });

    expect(message).toContain(
      'Expected control must have "{"email":"test@email","password":"test123"}" and received "{"email":"test@email","password":"test"}"',
    );
  });
});

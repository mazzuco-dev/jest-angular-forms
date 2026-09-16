import { registerAngularFormMatchers } from '../../setup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { captureMatcherError } from '../utils/capture-matcher-error';

registerAngularFormMatchers();

describe('toHaveRequiredControl', () => {
  it('should pass when the form contains the required control', () => {
    const form = new FormGroup({
      email: new FormControl('', Validators.required),
    });

    expect(form).toHaveRequiredControl('email');
  });

  it('should fail when the form not contains the required control', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveRequiredControl('email'),
    );

    expect(message).toContain('Expected control "email" to be required.');
  });

  it('should fail when the form not contains the control', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveRequiredControl('password'),
    );

    expect(message).toContain(
      'Expected form to have required control "password", but the control does not exist.',
    );
  });
});

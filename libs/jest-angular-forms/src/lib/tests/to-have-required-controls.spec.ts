import { registerAngularFormMatchers } from '../../setup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { captureMatcherError } from '../utils/capture-matcher-error';

registerAngularFormMatchers();

describe('toHaveRequiredControls', () => {
  it('should pass when the form contains the required control', () => {
    const form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    expect(form).toHaveRequiredControls('email', 'password');
  });

  it('should fail when the form not contains the required control', () => {
    const form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(''),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveRequiredControls('email', 'password', 'rememberMe'),
    );

    expect(message).toContain(
      'Expected controls to be required: email, rememberMe.',
    );
  });
});

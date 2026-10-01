import { registerAngularFormMatchers } from '../../setup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { captureMatcherError } from '../utils/capture-matcher-error';

registerAngularFormMatchers();

describe('toHaveValidator', () => {
  it('should pass when the form contains the email validator', () => {
    const form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    expect(form).toHaveValidator('email', Validators.email);
  });

  it('should fail when not contains the control', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveValidator('password', Validators.email),
    );

    expect(message).toContain('Expected control "password" to exist.');
  });

  it('should fail when the form not contains the email validator', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveValidator('email', Validators.email),
    );

    expect(message).toContain(
      'Expected control "email" to have the provided validator.',
    );
  });

  it('should pass when the form contains the min and max validator', () => {
    const maxFn = Validators.max(10);
    const minFn = Validators.min(0);

    const form = new FormGroup({
      upper: new FormControl(null, maxFn),
      lower: new FormControl(null, minFn),
    });

    expect(form).toHaveValidator('upper', maxFn);
    expect(form).toHaveValidator('lower', minFn);
  });
});

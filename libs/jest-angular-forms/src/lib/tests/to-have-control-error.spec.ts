import { registerAngularFormMatchers } from '../../setup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { captureMatcherError } from '../utils/capture-matcher-error';

registerAngularFormMatchers();

describe('toHaveControlError', () => {
  it('should pass when the form contains email error', () => {
    const form = new FormGroup({
      username: new FormControl('test', Validators.email),
    });

    expect(form).toHaveControlError('username', 'email');
  });

  it('should pass when the form contains min and max error', () => {
    const form = new FormGroup({
      value: new FormControl<number | null>(1, Validators.min(5)),
      count: new FormControl<number | null>(20, Validators.max(10)),
    });

    expect(form).toHaveControlError('value', 'min');
    expect(form).toHaveControlError('count', 'max');
  });

  it('should fail when the control does not exist', () => {
    const form = new FormGroup({
      username: new FormControl('test@email', Validators.required),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveControlError('username', 'email'),
    );

    expect(message).toContain('Expected control "username" to have error "email".');
  });
});

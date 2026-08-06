import { FormControl, FormGroup } from '@angular/forms';
import { registerAngularFormMatchers } from '../../setup';
import { captureMatcherError } from '../utils';

registerAngularFormMatchers();

describe('toHaveControl', () => {
  it('should pass when the form contains the control', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    expect(form).toHaveControl('email');
  });

  it('should pass with not when the control does not exist', () => {
    const form = new FormGroup({
      email: new FormControl(''),
    });

    expect(form).not.toHaveControl('password');
  });

  it('should support nested paths', () => {
    const form = new FormGroup({
      address: new FormGroup({
        street: new FormControl(''),
      }),
    });

    expect(form).toHaveControl('address.street');
  });

  it('should fail when the control does not exist', () => {
    const form = new FormGroup({
      password: new FormControl(''),
    });

    const message = captureMatcherError(() =>
      expect(form).toHaveControl('email'),
    );
    expect(message).toContain('Expected form to contain control "email".');
  });

  it('should fail when received is not a FormGroup', () => {
    const message = captureMatcherError(() =>
      expect({}).toHaveControl('email'),
    );

    expect(message).toContain(
      'Expected received value to be an Angular FormGroup.',
    );
  });
});

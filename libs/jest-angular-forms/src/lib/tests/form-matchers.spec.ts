import { FormControl, FormGroup, Validators } from '@angular/forms';
import { registerAngularFormMatchers } from '../../setup';

registerAngularFormMatchers();

describe('form matchers', () => {
  it('distinguishes valid and invalid forms', () => {
    const form = new FormGroup({ name: new FormControl('', Validators.required) });
    expect(form).toBeInvalidForm();
    expect(form).not.toBeValidForm();
    form.controls.name.setValue('Ada');
    expect(form).toBeValidForm();
    expect(form).not.toBeInvalidForm();
  });

  it('checks errors on the FormGroup itself', () => {
    const form = new FormGroup({ name: new FormControl('Ada') });
    form.setErrors({ mismatch: true });
    expect(form).toHaveFormError('mismatch');
    expect(form).not.toHaveFormError('required');
  });

  it('distinguishes value from raw value and compares deeply', () => {
    const form = new FormGroup({
      name: new FormControl('Ada'),
      secret: new FormControl({ value: 'hidden', disabled: true }),
    });
    expect(form).toHaveFormValue({ name: 'Ada' });
    expect(form).not.toHaveFormValue({ name: 'Ada', secret: 'hidden' });
    expect(form).toHaveRawValue({ secret: 'hidden', name: 'Ada' });
    expect(form).not.toHaveRawValue({ name: 'Other', secret: 'hidden' });
  });

  it('rejects values that are not FormGroups', () => {
    expect(() => expect({}).toBeValidForm()).toThrow('toBeValidForm expected an Angular FormGroup');
    expect(() => expect({}).toBeInvalidForm()).toThrow('toBeInvalidForm expected an Angular FormGroup');
    expect(() => expect({}).toHaveFormError('error')).toThrow('toHaveFormError expected an Angular FormGroup');
    expect(() => expect({}).toHaveFormValue({})).toThrow('toHaveFormValue expected an Angular FormGroup');
    expect(() => expect({}).toHaveRawValue({})).toThrow('toHaveRawValue expected an Angular FormGroup');
  });
});

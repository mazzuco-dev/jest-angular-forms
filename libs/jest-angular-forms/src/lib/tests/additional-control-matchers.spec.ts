import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { registerAngularFormMatchers } from '../../setup';

registerAngularFormMatchers();

describe('additional control matchers', () => {
  const minLength = Validators.minLength(3);
  const form = new FormGroup({
    profile: new FormGroup({
      name: new FormControl('', [Validators.required, minLength]),
    }),
    addresses: new FormArray([new FormControl({ city: 'Paris', zip: 75000 })]),
    disabled: new FormControl({ value: 'hidden', disabled: true }),
  });

  it('checks every validator using its original function reference', () => {
    expect(form).toHaveValidators('profile.name', Validators.required, minLength);
    expect(form).not.toHaveValidators('profile.name', Validators.email);
    expect(form).not.toHaveValidators('missing', Validators.required);
    expect(() => expect(form).toHaveValidators('profile.name')).toThrow('at least one validator');
  });

  it('checks all current control errors', () => {
    form.controls.profile.controls.name.setErrors({ required: true, minlength: true });
    expect(form).toHaveControlErrors('profile.name', 'required', 'minlength');
    expect(form).not.toHaveControlErrors('profile.name', 'email');
    expect(form).not.toHaveControlErrors('missing', 'required');
    expect(() => expect(form).toHaveControlErrors('profile.name')).toThrow('at least one error');
  });

  it('compares nested control values with Jest deep equality', () => {
    expect(form).toHaveControlValue('addresses.0', { zip: 75000, city: 'Paris' });
    expect(form).not.toHaveControlValue('addresses.0', { city: 'London', zip: 75000 });
    expect(form).not.toHaveControlValue('missing', undefined);
  });

  it('checks enabled and disabled controls', () => {
    expect(form).toHaveEnabledControl('profile.name');
    expect(form).not.toHaveDisabledControl('profile.name');
    expect(form).toHaveDisabledControl('disabled');
    expect(form).not.toHaveEnabledControl('disabled');
    expect(form).not.toHaveEnabledControl('missing');
    expect(form).not.toHaveDisabledControl('missing');
  });

  it('rejects values that are not FormGroups', () => {
    expect(() => expect({}).toHaveValidators('name', Validators.required)).toThrow('toHaveValidators expected an Angular FormGroup');
    expect(() => expect({}).toHaveControlErrors('name', 'required')).toThrow('toHaveControlErrors expected an Angular FormGroup');
    expect(() => expect({}).toHaveControlValue('name', '')).toThrow('toHaveControlValue expected an Angular FormGroup');
    expect(() => expect({}).toHaveEnabledControl('name')).toThrow('toHaveEnabledControl expected an Angular FormGroup');
    expect(() => expect({}).toHaveDisabledControl('name')).toThrow('toHaveDisabledControl expected an Angular FormGroup');
  });
});

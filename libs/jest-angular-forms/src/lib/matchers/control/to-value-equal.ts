import { ensureFormGroup } from '../../utils/ensure-form-group';

export function toValueEqual(received: unknown, expectValue: unknown) {
  const control = ensureFormGroup(received, 'toValueEqual');

  const rawValue = control.getRawValue();
  const transformValue = (value: unknown) => JSON.stringify(value);
  const rawValueText = transformValue(rawValue);
  const expectValueText = transformValue(expectValue);
  const pass = rawValueText == expectValueText;
  return {
    pass,
    message: () =>
      pass
        ? `Expected control to have value: "${rawValueText}."`
        : `Expected control must have "${expectValueText}" and received "${rawValueText}".`,
  };
}

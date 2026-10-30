import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { getControl } from '../../utils/get-control';
import { formatValue, ValueMatcherContext } from '../../utils/value-matcher';

export function toHaveControlValue(
  this: ValueMatcherContext,
  received: unknown,
  path: string,
  expected: unknown,
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveControlValue');
  const control = getControl(form, path);
  if (!control) {
    return { pass: false, message: () => `Expected control "${path}" to exist.` };
  }
  const pass = this.equals(control.value, expected);
  return {
    pass,
    message: () =>
      `Expected control "${path}" ${pass ? 'not ' : ''}to have value ${formatValue(expected)}; received ${formatValue(control.value)}.`,
  };
}

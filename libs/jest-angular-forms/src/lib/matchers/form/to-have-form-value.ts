import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { formatValue, ValueMatcherContext } from '../../utils/value-matcher';

export function toHaveFormValue(
  this: ValueMatcherContext,
  received: unknown,
  expected: unknown,
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveFormValue');
  const pass = this.equals(form.value, expected);
  return {
    pass,
    message: () =>
      `Expected form ${pass ? 'not ' : ''}to have value ${formatValue(expected)}; received ${formatValue(form.value)}.`,
  };
}

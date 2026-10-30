import { MatcherResult } from '../../types/matcher-result';
import { ensureFormGroup } from '../../utils/ensure-form-group';
import { formatValue, ValueMatcherContext } from '../../utils/value-matcher';

export function toHaveRawValue(
  this: ValueMatcherContext,
  received: unknown,
  expected: unknown,
): MatcherResult {
  const form = ensureFormGroup(received, 'toHaveRawValue');
  const rawValue = form.getRawValue();
  const pass = this.equals(rawValue, expected);
  return {
    pass,
    message: () =>
      `Expected form ${pass ? 'not ' : ''}to have raw value ${formatValue(expected)}; received ${formatValue(rawValue)}.`,
  };
}

import { FormGroup } from '@angular/forms';

export function ensureFormGroup(
  received: unknown,
  matcherName: string,
): FormGroup {
  if (!(received instanceof FormGroup)) {
    const type = getType(received);
    throw new TypeError(
      `${matcherName} expected an Angular FormGroup, but received ${type}.`,
    );
  }

  return received;
}

function getType(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  return value.constructor?.name ?? typeof value;
}

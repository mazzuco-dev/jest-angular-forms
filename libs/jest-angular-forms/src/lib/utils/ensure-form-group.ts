import { FormGroup } from '@angular/forms';

interface EnsureFormGroupSuccess {
  success: true;
  form: FormGroup;
}

interface EnsureFormGroupFailure {
  success: false;
  received: unknown;
}

type EnsureFormGroupResult = EnsureFormGroupSuccess | EnsureFormGroupFailure;

export function ensureFormGroup(received: unknown): EnsureFormGroupResult {
  if (received instanceof FormGroup) {
    return {
      success: true,
      form: received,
    };
  }

  return { success: false, received };
}

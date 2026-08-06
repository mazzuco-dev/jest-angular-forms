import { FormGroup } from '@angular/forms';
import { getControl } from './get-control';
import { ControlPath } from './control-path';

export function hasControl(root: FormGroup, path: ControlPath) {
  const result = getControl(root, path);
  return result.success;
}

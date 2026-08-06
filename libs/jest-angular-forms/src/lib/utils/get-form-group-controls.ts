import { FormGroup } from '@angular/forms';
import { getControl } from './get-control';

export function getFormGroupControls(root: FormGroup, path: string) {
  const paths = path.split('.');
  const isNested = paths.length > 1;
  let form = root;
  if (isNested) {
    paths.pop();
    const result = getControl(root, paths);
    if (!result.success) {
      throw new Error(`Error ${result.reason}: "${path}"`);
    }

    form = result.control as FormGroup;
  }

  return Object.keys(form.controls);
}

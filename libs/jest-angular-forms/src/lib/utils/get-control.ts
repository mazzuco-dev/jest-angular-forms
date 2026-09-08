import { FormGroup } from '@angular/forms';

export function getControl(root: FormGroup, path: string) {
  if (!path.trim()) {
    return null;
  }

  return root.get(path);
}

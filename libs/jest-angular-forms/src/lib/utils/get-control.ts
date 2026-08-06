import { FormGroup } from '@angular/forms';
import { ControlPath } from './control-path';

export function getControl(root: FormGroup, path: ControlPath) {
  if (!isValidControlPath(path)) {
    return {
      success: false,
      path,
      reason: 'invalid path',
    };
  }

  const control = root.get(path);

  if (!control) {
    return {
      success: false,
      path,
      reason: 'control not found',
    };
  }

  return {
    success: true,
    control,
  };
}

function isValidControlPath(path: ControlPath): boolean {
  if (typeof path === 'string') {
    return path.trim().length > 0;
  }

  return (
    path.length > 0 &&
    path.every((segment) => {
      if (typeof segment === 'number') {
        return Number.isInteger(segment) && segment >= 0;
      }

      return segment.trim().length > 0;
    })
  );
}

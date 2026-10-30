# jest-angular-forms

Custom Jest matchers for testing Angular Reactive Forms with a simpler, more expressive API.

The goal of `jest-angular-forms` is to reduce repetitive assertions and make form tests easier to read and maintain.

Instead of writing:

```ts
expect(form.get('email')).toBeTruthy();
expect(form.get('password')).toBeTruthy();
expect(form.get('email')?.hasValidator(Validators.required)).toBe(true);
expect(form.invalid).toBe(true);
```

You can write:

```ts
expect(form).toHaveControls('email', 'password');
expect(form).toHaveRequiredControls('email', 'password');
expect(form).toBeInvalidForm();
```

> This project is currently under development.

## Features

- Expressive matchers for Angular Reactive Forms
- Support for nested control paths
- Jest integration through `expect.extend`
- TypeScript declarations for custom matchers
- Clear failure messages
- Built and tested with Nx
- Designed to grow without coupling matchers to application code

## Requirements

- Angular 17 or newer
- Jest 29 or newer
- TypeScript 5 or newer

Angular and Jest should be installed by the consumer project.

## Installation

```bash
npm install --save-dev @mazzuco-dev/jest-angular-forms
```

## Jest setup

Create or update your Jest setup file and add `registerAngularFormMatchers` after your jest setup:

Example:

```ts
// setup-jest.ts

import {setupZoneTestEnv} from 'jest-preset-angular/setup-env/zone';
import {registerAngularFormMatchers} from '@mazzuco-dev/jest-angular-forms';

setupZoneTestEnv();
registerAngularFormMatchers();
```

The matchers can then be used without importing the library in every test file.

## Available matchers

| Matcher                            | Description                                                                     |
|------------------------------------|---------------------------------------------------------------------------------|
| `toHaveControl(path)`              | Checks whether a control exists at the given path                               |
| `toHaveControls(...paths)`         | Checks whether controls exist at all the given paths                            |
| `toHaveRequiredControl(path)`      | Checks whether the control at the given path has the required validator         |
| `toHaveRequiredControls(...paths)` | Checks whether the controls at all the given paths have the required validator  |
| `toHaveControlError(path, error)`  | Checks whether the control at the given path has the specified validation error |
| `toHaveValidator(path, validator)` | Checks whether the control at the given path has the specified validator        |
| `toHaveValidators(path, ...validators)` | Checks that the control has every supplied validator function            |
| `toHaveControlErrors(path, ...errors)` | Checks that the control currently has every supplied error name           |
| `toHaveControlValue(path, expected)` | Deeply compares a control's value with the expected value                   |
| `toHaveEnabledControl(path)` | Checks that a control exists and is enabled                                  |
| `toHaveDisabledControl(path)` | Checks that a control exists and is disabled                                 |
| `toBeValidForm()` | Checks the form's current valid status                                              |
| `toBeInvalidForm()` | Checks the form's current invalid status                                          |
| `toHaveFormError(error)` | Checks an error on the FormGroup itself                                      |
| `toHaveFormValue(expected)` | Deeply compares `form.value`, which omits disabled controls               |
| `toHaveRawValue(expected)` | Deeply compares `form.getRawValue()`, including disabled controls           |

For `toHaveValidators`, reuse the same validator function instances assigned to the controls. The value matchers use Jest deep equality.

## License

MIT

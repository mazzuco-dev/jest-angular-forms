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

| Matcher                            | Description                             |
|------------------------------------|-----------------------------------------|
| `toHaveControl(path)`              | Checks whether a control exists         |
| `toHaveControls(...paths)`         | Checks whether all controls exist       |
| `toHaveRequiredControl(path)`      | Checks whether a control is required    |
| `toHaveRequiredControls(...paths)` | Checks whether all controls is required |

## Planned MVP matchers

### Control

- `toHaveControl`
- `toHaveControls`
- `toHaveRequiredControl`
- `toHaveRequiredControls`
- `toHaveValidator`
- `toHaveValidators`
- `toHaveControlError`
- `toHaveControlErrors`
- `toHaveControlValue`
- `toHaveEnabledControl`
- `toHaveDisabledControl`

### Form

- `toBeValidForm`
- `toBeInvalidForm`
- `toHaveFormError`
- `toHaveFormValue`
- `toHaveRawValue`

## License

MIT

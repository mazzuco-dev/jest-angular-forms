<div align="center">
  <img src="./logo.svg" alt="Angular shield with the Jest logo" width="88" height="88" />
  <h1>jest-angular-forms</h1>
  <p>Jest matchers for Angular Reactive Forms.</p>
</div>

---

## Install

```bash
npm install --save-dev @mazzuco-dev/jest-angular-forms
```

## Register

After initializing the Angular test environment, call the registration function in your Jest setup file:

```ts
import { registerAngularFormMatchers } from '@mazzuco-dev/jest-angular-forms';

registerAngularFormMatchers();
```

Add that file to Jest's `setupFilesAfterEnv` and to your test TypeScript configuration.

## Use

```ts
expect(form).toHaveControls('email', 'password');
expect(form).toHaveRequiredControls('email', 'password');
expect(form).toBeInvalidForm();
```

Matchers expect an Angular `FormGroup`. Control paths follow `form.get()`, including nested groups and array indexes. `toHaveFormValue` compares `form.value`; `toHaveRawValue` compares `form.getRawValue()` and includes disabled controls. The documentation site includes the full matcher reference.

## Development

```bash
npm exec nx run jest-angular-forms:test
npm exec nx run jest-angular-forms:build
```

## License

MIT

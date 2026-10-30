# jest-angular-forms

Jest matchers for Angular reactive forms. See the [repository README](https://github.com/mazzuco-dev/jest-angular-forms#readme) for the full matcher list and examples.

## Install and register

```bash
npm install --save-dev @mazzuco-dev/jest-angular-forms
```

In your Jest setup file, after setting up the Angular test environment:

```ts
import { registerAngularFormMatchers } from '@mazzuco-dev/jest-angular-forms';

registerAngularFormMatchers();
```

Add the setup file to Jest's `setupFilesAfterEnv` and include it in the test TypeScript configuration so matcher declarations are available.

```ts
expect(form).toHaveControls('email', 'password');
expect(form).toHaveRequiredControls('email', 'password');
expect(form).toBeInvalidForm();
```

The matchers expect an Angular `FormGroup`. Control paths use Angular's `form.get()` syntax, including nested groups and array indexes. `toHaveFormValue` compares `form.value`; `toHaveRawValue` compares `form.getRawValue()` and includes disabled controls.

## Development

```bash
npm exec nx run jest-angular-forms:test
npm exec nx run jest-angular-forms:build
```

## License

MIT

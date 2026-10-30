<div align="center">
  <img src="libs/jest-angular-forms/logo.svg" alt="Angular shield with the Jest logo" width="96" height="96" />
  <h1>jest-angular-forms</h1>
  <p>Readable Jest assertions for Angular Reactive Forms.</p>
  <p>
    <a href="https://mazzuco-dev.github.io/jest-angular-forms/">Documentation</a>
    ·
    <a href="https://mazzuco-dev.github.io/jest-angular-forms/pt/">Documentação em português</a>
    ·
    <a href="https://github.com/mazzuco-dev/jest-angular-forms/issues">Issues</a>
  </p>
</div>

---

Test form controls, validators, errors, and values without repeating `form.get()` calls throughout your Jest suite. Each matcher reports a useful failure message.

```ts
expect(form).toHaveControls('email', 'profile.name');
expect(form).toHaveRequiredControl('email');
expect(form).not.toBeValidForm();
```

## Quick start

### 1. Install

The package declares Angular 17+ and Jest 29+ as peer dependencies.

```bash
npm install --save-dev @mazzuco-dev/jest-angular-forms
```

### 2. Register the matchers

Call `registerAngularFormMatchers()` after initializing the Angular test environment. This example uses the zoneless setup:

```ts
// src/test-setup.ts
import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';
import { registerAngularFormMatchers } from '@mazzuco-dev/jest-angular-forms';

setupZonelessTestEnv();
registerAngularFormMatchers();
```

For suites using Zone.js, initialize `setupZoneTestEnv` from `jest-preset-angular/setup-env/zone` instead.

Add the setup file to Jest and to the test TypeScript configuration so the matcher declarations are available:

```ts
// jest.config.ts
export default {
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
};
```

```jsonc
// tsconfig.spec.json (relevant fields)
{
  "compilerOptions": { "types": ["jest", "node"] },
  "files": ["src/test-setup.ts"],
}
```

### 3. Assert on a FormGroup

```ts
expect(form).toHaveControls('email', 'profile.name', 'addresses.0.street');
expect(form).toHaveControlError('email', 'required');
expect(form).toBeInvalidForm();
```

Every matcher receives a `FormGroup` in `expect(form)`. Paths use `FormGroup.get()`, including nested groups and `FormArray` indexes. Matchers that accept multiple paths support both strings and arrays of strings.

## Matcher reference

- **Structure and state:** `toHaveControl`, `toHaveControls`, `toHaveEnabledControl`, `toHaveDisabledControl`
- **Validators and errors:** `toHaveRequiredControl`, `toHaveRequiredControls`, `toHaveValidator`, `toHaveValidators`, `toHaveControlError`, `toHaveControlErrors`, `toHaveFormError`, `toBeValidForm`, `toBeInvalidForm`
- **Values:** `toHaveControlValue`, `toHaveFormValue`, `toHaveRawValue`

See the [full API reference](https://mazzuco-dev.github.io/jest-angular-forms/#api) for signatures, descriptions, and examples.

### Behavior to know

- Validator matchers use `hasValidator()`: pass the same `ValidatorFn` instance assigned to the control.
- Error matchers inspect the current validation state through `hasError()`.
- Value matchers use Jest deep equality. `toHaveFormValue` reads `form.value` and omits disabled controls; `toHaveRawValue` reads `form.getRawValue()` and includes them.
- Every matcher supports Jest's `.not` negation.

## Documentation site

The Angular app is in `apps/docs`, with separate TypeScript, HTML, and CSS files for each component. English is the default locale. Angular `i18n` markers live in the templates, and Portuguese translations live in `apps/docs/src/locale/messages.pt-BR.json`. The SSG build publishes English at `/` and Portuguese at `/pt/`.

| Task                               | Command                                                          |
| ---------------------------------- | ---------------------------------------------------------------- |
| Preview both languages             | `npm exec nx run docs:serve`                                     |
| Develop with live reload (English) | `npm exec nx run docs:serve-dev`                                 |
| Build for GitHub Pages             | `npm exec nx run docs:build -- --base-href /jest-angular-forms/` |
| Extract source messages            | `npm exec nx run docs:extract-i18n`                              |

The static output is in `dist/apps/docs/browser`. Restart `docs:serve` after source changes. The [CI workflow](.github/workflows/docs.yml) tests the library, checks the localized site, and publishes it from `main`. Set the repository's Pages source to **GitHub Actions**.

## Development

```bash
npm exec nx run jest-angular-forms:test
npm exec nx run jest-angular-forms:build
```

## License

MIT

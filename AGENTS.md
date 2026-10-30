<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

## Implementing `jest-angular-forms`

- The library lives in `libs/jest-angular-forms`. It provides Jest matchers for Angular reactive forms. Its public entry point is `src/index.ts`, which loads the declarations module `src/jest.ts` and exports `registerAngularFormMatchers` from `src/setup.ts`.
- Before changing a matcher, inspect its implementation under `src/lib/matchers/` and its corresponding tests under `src/lib/tests/`. Preserve the existing public API when adding behavior.
- Each matcher receives the value passed to `expect(...)` as its first argument. The current matchers expect a `FormGroup`; use `ensureFormGroup` for consistent validation errors. Use `getControl` to resolve paths through `FormGroup.get()`, including nested paths such as `profile.name` and `addresses.0.street`.
- Matchers accepting multiple paths should support strings and arrays of strings and call `normalizePaths`. Return `{ pass: boolean, message: () => string }`, naming failed paths when helpful. Cover negation with `.not`.
- Required checks use `control.hasValidator(Validators.required)`. Specific validator checks use `control.hasValidator(validator)` and therefore require the same function reference. Error checks use `control.hasError(error)` on the current validation state.
- The newer value matchers use Jest's deep equality through the matcher context. `toHaveFormValue` checks `form.value`, while `toHaveRawValue` checks `form.getRawValue()`, including disabled controls. `toHaveFormError` checks an error on the `FormGroup` itself.
- To add a matcher, implement it under `src/lib/matchers/control/` or another suitable matcher directory, register it in `src/lib/matchers.ts`, add its signature to both `jest` and `expect` interfaces in `src/jest.ts`, and add tests under `src/lib/tests/`. `registerAngularFormMatchers` calls `expect.extend(angularFormMatchers)`, so registration in that object is required.
- Test success, failure, missing paths, and non-`FormGroup` input where applicable. Follow the `toHaveControls` tests for nested paths and `FormArray`. `apps/example-app-jest/src/test-setup.ts` shows registration after the Angular test environment is prepared.
- Validate changes with `npm exec nx run jest-angular-forms:test`. Run `npm exec nx run jest-angular-forms:build` when the public API or declarations change. Query the resolved Nx project and targets before running other commands.

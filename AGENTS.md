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

## Implementação da biblioteca `jest-angular-forms`

- A biblioteca fica em `libs/jest-angular-forms`. Ela fornece matchers do Jest para formulários reativos do Angular. O ponto de entrada público é `src/index.ts`, que carrega o módulo de declarações `src/jest.ts` e exporta `registerAngularFormMatchers` de `src/setup.ts`.
- Antes de alterar um matcher, consulte sua implementação em `src/lib/matchers/control/` e os testes correspondentes em `src/lib/tests/`. Preserve a API pública existente ao acrescentar comportamentos.
- Todo matcher recebe o valor de `expect(...)` como primeiro argumento. Os matchers atuais esperam um `FormGroup`; use `ensureFormGroup` para validar esse valor e manter mensagens de erro consistentes. Para localizar controles por caminho, use `getControl`, que delega a `FormGroup.get()` e aceita caminhos aninhados como `profile.name` e `addresses.0.street`.
- Para matchers que recebem vários caminhos, aceite strings e arrays de strings e use `normalizePaths` antes de verificar os controles. Retorne um resultado com `pass: boolean` e `message: () => string`, incluindo os caminhos que falharam na mensagem quando isso ajudar o diagnóstico. Cubra também a forma negada com `.not`.
- Os matchers de obrigatoriedade usam `control.hasValidator(Validators.required)`. A verificação de um validador específico usa `control.hasValidator(validator)` e, portanto, depende da mesma referência de função. A verificação de erro usa `control.hasError(error)` no estado atual. `toValueEqual` compara `form.getRawValue()` por serialização com `JSON.stringify`; considere essa semântica e suas limitações ao alterar ou documentar o matcher.
- Ao adicionar um matcher, crie sua implementação em `src/lib/matchers/control/` ou em um diretório adequado ao tipo de matcher; registre-o em `src/lib/matchers.ts`; acrescente a assinatura às interfaces de `src/jest.ts` para `jest` e `expect`; e adicione testes em `src/lib/tests/`. A função `registerAngularFormMatchers` usa `expect.extend(angularFormMatchers)`, de modo que novos matchers precisam constar nesse objeto para funcionar.
- Inclua nos testes casos de sucesso, falha, caminho ausente e entrada que não seja `FormGroup`, conforme aplicável. Para caminhos aninhados e `FormArray`, siga os exemplos dos testes de `toHaveControls`. O app `apps/example-app-jest` demonstra o registro no `src/test-setup.ts` após preparar o ambiente Angular.
- Para validar alterações, execute `npm exec nx run jest-angular-forms:test` e, quando mudar a API pública ou as declarações, `npm exec nx run jest-angular-forms:build`. Use o projeto e os alvos resolvidos pelo Nx antes de executar outros comandos.

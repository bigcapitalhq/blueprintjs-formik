# AGENTS.md

## Cursor Cloud specific instructions

This is a **Lerna + npm workspaces monorepo** providing Formik binding components for Blueprint.js. It contains three publishable packages (`core`, `select`, `datetime`) under `packages/`, plus Storybook stories at the root for interactive development.

### Key commands

- **Install**: `npm install --legacy-peer-deps` (required due to peer dependency conflicts between `@blueprintjs/datetime` and `@types/react@18`)
- **Build**: `npm run build` (runs `lerna run build`, which executes Rollup + TypeScript in each package)
- **Typecheck**: `npm run typecheck` (runs `tsc` in each package via Lerna)
- **Storybook (dev server)**: `npm run storybook` (starts on port 6006)

### Non-obvious caveats

- `--legacy-peer-deps` is required for `npm install` because `@blueprintjs/datetime@4` declares `@types/react` peer as `^16.14.32 || 17` which conflicts with the root `@types/react@^18.2.0`.
- There are **no automated test files** in the codebase despite Jest + React Testing Library being installed.
- The `docs/` directory is a separate Docusaurus site with its own `package.json` and is **not** part of the npm workspaces. It requires a separate `npm install` inside `docs/` if needed.
- Rollup build warnings about "Unresolved dependencies" (formik, @blueprintjs/*) are expected; these are peer dependencies treated as externals.
- The `-s public` flag in the Storybook script references a non-existent `public/` directory, which produces a harmless warning at startup.

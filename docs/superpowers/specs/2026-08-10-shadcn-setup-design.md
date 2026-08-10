# shadcn/ui Setup Design

## Goal

Set up shadcn/ui in the existing Next.js 16 admin UI project using the canonical `shadcn init` CLI, and align the directory layout with the project's documented stack (`src/` layout, `@/*` → `src/*`).

## Context

- Next.js 16.3.0 (App Router, Turbopack), React 19.2.8, Tailwind CSS v4, TypeScript 5
- Current layout: `app/` at root, tsconfig alias `@/*` → `./*`, no `src/` directory
- Stack doc (AGENTS.md) expects: `src/components/ui/`, import alias `@/*` → `src/*`
- No `components.json`, no `lib/utils.ts` yet

## Approach

Use the official CLI (`npx shadcn@latest init`) rather than hand-rolling config, since it correctly generates `components.json`, the Tailwind v4 CSS variables theme, and `lib/utils.ts`. This keeps the setup canonical with shadcn v4.

## Steps

### 1. Restructure to src/ layout

- `git mv app src/app`
- Create `src/components/` and `src/lib/` directories
- Update `tsconfig.json` path: `"@/*": ["./*"]` → `"@/*": ["./src/*"]`

### 2. Initialize shadcn

- Run `npx shadcn@latest init` (non-interactive flags for base color neutral, CSS variables)
- Confirm generated artifacts: `components.json`, updated `src/app/globals.css` theme, `src/lib/utils.ts`
- Verify `cn()` utility imports from `@/lib/utils`

### 3. Add minimal components

- `npx shadcn@latest add button input card badge`
- Components land in `src/components/ui/`

### 4. Update app shell

- Ensure `src/app/layout.tsx` imports from correct paths
- Keep existing Geist font setup and metadata

### 5. Verify

- `npm run lint`
- `npm run build`

## Success Criteria

- `components.json` exists and is valid
- `src/components/ui/` contains button, input, card, badge
- `src/lib/utils.ts` exports `cn()`
- tsconfig alias points at `./src/*`
- lint and build pass

## Out of Scope

- Adding the full component library
- Theming beyond the shadcn init default
- Dark mode toggle
- Any visual or layout redesign of the admin UI

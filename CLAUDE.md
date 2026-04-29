# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start dev server with Turbopack at localhost:3000
pnpm build    # Production build
pnpm lint     # ESLint check
```

No test runner is configured.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, Zustand 5, TanStack Query 5, Formik 2, Yup 1, Axios. Package manager: **pnpm**.

## Architecture

This is a test assignment with 4 independent task pages under `app/`:

| Route | Task |
|-------|------|
| `/test_1` | Formik form (login / password / repassword) with Yup validation; on submit saves login to Zustand and redirects to `/test_2` |
| `/test_2` | Reads login from Zustand, shows `"{login} success"` |
| `/test_3` | Fetches posts from `https://jsonplaceholder.typicode.com/posts` via Axios + TanStack Query; filters by **even** id; search by title; saves first 10 posts to Zustand |
| `/test_4` | Dropdown list of the 10 posts stored in Zustand; closes on outside click via `useRef` |

**Zustand store** does not exist yet — needs to be created (e.g. `store/useStore.ts`). It must hold:
- `login: string` — set on test_1 submit
- `posts: Post[]` — first 10 posts from test_3

**TanStack Query** is wired globally via `components/NextQueryProvider`, which wraps the entire app in `app/layout.tsx`. The provider handles the SSR/browser singleton pattern for `QueryClient` (see `components/NextQueryProvider/get-query-client.ts`). Default `staleTime` is 60 s.

All pages that use hooks must be `"use client"` components. `app/layout.tsx` is a Server Component — the `NextQueryProvider` wrapper must stay there to enable query on every page.

## Validation rules (Yup, test_1)

- `login`: min 3, max 15 characters
- `password`: min 3, max 15 characters
- `repassword`: min 3, max 15 characters, must match `password`
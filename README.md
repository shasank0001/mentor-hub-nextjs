## PrepMentor Hub – Next.js Migration

This package contains the Next.js App Router port of the PrepMentor Hub platform. It mirrors the Vite implementation feature-for-feature while adding SSR-friendly structure, centralized providers, and shadcn/ui primitives.

## Prerequisites

- Node.js 22+
- npm 10+ (or pnpm/bun if preferred)

## Local Development

Run the dev server with hot reload:

```bash
npm run dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

## Quality Gates

```bash
npm run lint   # ESLint (Next.js flat config)
npm run build  # Production build with type/lint checks
```

## Production Build & Smoke Test

```bash
npm run build  # Generates .next/ using the App Router compiler
npm run start  # Serves the production build on port 3000
```

Stop the server with `Ctrl+C` once you finish validating.

## Deployment (Vercel)

1. Create a new Vercel project and link the `prepmentor-hub-next` directory.
2. Set the build command to `npm run build` and the output directory to `.next`.
3. Configure any environment variables in the Vercel dashboard (`.env.local` is ignored by git).
4. Trigger a deploy (push to `main` or manual deploy). Vercel will run build + start automatically.
5. After the first deploy, configure the custom domain and enable monitoring (Vercel Analytics or an external provider).

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TanStack Query](https://tanstack.com/query/latest)

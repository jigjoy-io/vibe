# Vibecode CLI

Interactive CLI for scaffolding web projects.

## Usage

```bash
npx @jigjoy-io/vibe
```

Follow the prompts to:
1. Choose a template
2. Name your project
3. Auto-install dependencies

## Templates

- **Website (Next.js)** - Static websites, marketing pages, blogs, and portfolios with React Server Components and optimal SEO.
- **Web App (SPA + Database)** - Interactive apps like dashboards, SaaS tools, or social platforms with Supabase auth, real-time data, and serverless backend.
- **Mobile App** _(coming soon)_ - Cross-platform mobile apps with Expo React Native and EAS deployment.

## After Creation

```bash
cd your-project
pnpm dev
```

## How Templates Work with Claude Code

Each template includes a `CLAUDE.md` file that instructs Claude Code to follow strict quality rules.

**After every code change, Claude automatically runs:**
```bash
pnpm lint        # Check code style
pnpm typecheck   # Verify TypeScript types
pnpm test        # Run all tests
```

If any check fails, Claude stops and fixes it before continuing.

**Before deployment:**
```bash
pnpm verify      # Run all checks
pnpm build       # Build for production
```

**What this means:**
- Every feature gets tested automatically
- No type errors slip through
- Code style stays consistent
- Push to `main` branch auto-deploys to Vercel

**Rules Claude follows:**
- Tests are mandatory for new components/functions
- No `any` types or error suppression
- No refactoring unrelated code
- Features stay isolated (no cross-imports)

This setup protects you from broken code. Claude can't skip checks or push failing builds.

---

Created by JigJoy team

Website: https://jigjoy.io
GitHub: https://github.com/jigjoy-io

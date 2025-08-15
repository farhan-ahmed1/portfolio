# Personal Portfolio

My personal portfolio website built with NextJs, Tailwind, TypeScript, Prisma, Velite, and Radix UI.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Radix UI + shadcn/ui**
- **MDX with Velite**
- **PostgreSQL with Prisma**
- **Resend** (email)
- **Vercel** (deployment)

## Development Workflow

This project uses branch protection and automated deployments:

### Making Changes

1. **Create a feature branch** from `main`:

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/your-change
   ```

2. **Make your changes** and commit:

   ```bash
   git add .
   git commit -m "feat: your change description"
   git push origin feature/your-change
   ```

3. **Create a Pull Request** targeting `main` branch

### Automated Process

- **CI Checks**: When you open a PR, automated tests run (linting, type-checking, build)
- **Preview Deployment**: A preview deployment is created on Vercel for testing
- **Production Deployment**: When you merge the PR, it automatically deploys to production

### Branch Protection

The `main` branch is protected and requires:

- ✅ All CI checks must pass
- ✅ Pull request review (can be bypassed by admin)
- ✅ Branch must be up to date

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Marketing pages (home, about, etc.)
│   ├── projects/          # Project showcase pages
│   └── api/               # API routes
├── components/            # Reusable UI components
├── content/               # MDX content files
│   └── projects/         # Project case studies
├── lib/                   # Utilities and configurations
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

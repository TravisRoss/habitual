# Habitual

Build better habits. Track your progress and stay consistent, one day at a time. It's about progress, not perfection.

## Features

- **Dashboard** — Daily overview of habits and active goals
- **Habit Tracking** — Create habits with daily, weekly, or custom schedules and mark them complete
- **Goal Management** — Set measurable goals with targets and time periods
- **Progress Reports** — Visualise completion rates and per-goal progress, filterable by week/month/year
- **Settings** — Theme (light/dark), week start day, and account management
- **Auth** — Email/password with forgot password flow, Google and GitHub OAuth

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19 |
| Database | Supabase (PostgreSQL) |
| Auth | next-auth |
| Data fetching | TanStack Query v5 |
| Styling | Tailwind CSS v4, shadcn/ui, Radix UI |
| Email | Resend |
| Forms | react-hook-form + Zod |
| Testing | Vitest, Playwright, Storybook |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account (for password reset emails)
- Google and/or GitHub OAuth app credentials (optional)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database (use pooler URL if on WSL2)
DATABASE_URL=

# next-auth
NEXT_AUTH_SECRET=
NEXT_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# OAuth (optional)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Email
RESEND_API_KEY=
```

### Database Setup

Run the next-auth schema in your Supabase SQL editor:

```bash
npm run auth:generate
```

Then apply your Supabase migrations.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev                 # Start dev server
npm run build               # Build for production
npm run start               # Start production server
npm run lint                # Lint code

# Testing
npm run test                # Unit tests (Vitest)
npm run test:integration    # Integration tests
npm run test:storybook      # Storybook component tests
npm run test:e2e            # End-to-end tests (Playwright)

# Other
npm run storybook           # Run Storybook on port 6006
npm run gen:types           # Regenerate Supabase TypeScript types
npm run auth:generate       # Generate next-auth schema
```

## Project Structure

```
app/                  # Next.js App Router pages and layouts
├── dashboard/        # Protected dashboard routes
├── login/            # Auth pages
└── _lib/             # Server-side utilities and actions

components/
├── ui/               # Base UI components (shadcn)
└── features/         # Feature-specific components

lib/
├── data-service.ts   # Supabase data access layer
├── auth.ts           # next-auth server config
├── auth-client.ts    # next-auth browser client
└── resend.ts         # Email service

hooks/                # Custom React hooks
types/                # TypeScript type definitions
```

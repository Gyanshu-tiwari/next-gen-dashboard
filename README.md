# Aether Academy — Next-Gen Learning Dashboard

A **premium, fully-personalized student learning dashboard** built with Next.js 16 App Router, Tailwind CSS v4, Framer Motion, and shadcn/ui. Designed for independent learners who want a focused, analytics-rich workspace with zero collaborative noise.

---

## ✨ Features

### Dashboard (`/`)
- **Collapsible Sidebar** — Defaults to expanded (`w-64`) on desktop. Click the graduation-cap logo to toggle to icon-only mode (`w-20`) with smooth `300ms` CSS transition. Sidebar state is lifted to `DashboardShell` so padding adjusts atomically.
- **AI Study Coach Widget** — Personalized learning recommendations; clicking *"Consult AI Coach"* schedules a focused practice task directly into the roadmap via React state.
- **DB-Driven Course States** — The course section renders based on real Supabase data: has data → success list, empty table → "No courses enrolled yet.", fetch error → "Unable to load learning data. [Retry]". No simulation UI.
- **Ongoing Courses** — Animated rows with dot-slider progress bars and `whileHover={{ y: -2 }}` micro-interactions.
- **Interactive Roadmap Timeline** — Check off milestones, add custom goals (title, time, duration, category) via an inline slide-down form sorted chronologically.
- **Circular Curriculum Progress Gauge** — SVG radial dial showing average course completion percentage, animated on mount.
- **Weekly Study Time Bar Chart** — 7-day breakdown with hover tooltips showing exact hours.
- **Pomodoro Focus Timer** — 25-minute countdown with Start / Pause / Reset controls, animated soundwave bars, and an in-component emerald completion banner (no `alert()`).
- **Study Plan / Personal Goals Tabs** — Contextual weekly metrics panel.

### Navigation
| Route | Description |
|---|---|
| `/` | Main personalized dashboard |
| `/courses` | Under development — full-width page |
| `/explore` | Under development — full-width page |
| `/analytics` | Under development — full-width page |
| `/categories` | Under development — full-width page |
| `/settings` | Under development — full-width page |

All non-dashboard routes render a premium full-width **"Under Construction"** page with a two-column layout (text + `404.webp` image), animated progress bar, module status pills, and a *"Return to Dashboard"* button.

---

## 🏗 Architecture & Design Decisions

### Server / Client Component Split

This project follows Next.js App Router conventions where components are **Server Components by default** and opt-in to being Client Components only when necessary (interactivity, hooks, browser APIs).

```
app/
├── page.tsx              ← Server Component (async, fetches from Supabase)
├── layout.tsx            ← Server Component (static shell)
└── courses/page.tsx      ← Server Component (renders shared UnderDevelopment)

components/
├── layout/
│   ├── dashboard-shell.tsx   ← "use client" — manages sidebar toggle state
│   ├── sidebar.tsx           ← "use client" — uses usePathname, Framer Motion
│   ├── mobile-nav.tsx        ← "use client" — uses sheet/drawer state
│   └── under-development.tsx ← "use client" — uses Framer Motion animations
└── dashboard/
    └── dashboard-view.tsx    ← "use client" — all interactivity lives here
```

**Key decisions:**

#### 1. Data fetching at the page (Server) level
`app/page.tsx` is an `async` Server Component. It calls `getCourses()` — a thin Supabase query — at the top level and passes the result down as props. This means:
- The DB round-trip happens **on the server**, never exposing credentials to the browser.
- The page is **statically pre-renderable** when data is available at build time.
- Errors are caught with `try/catch` and surfaced as an `isError: boolean` prop, keeping error-handling logic out of the client bundle.

```ts
// app/page.tsx — Server Component
export default async function HomePage() {
  let courses: Course[] = []
  let isError = false
  try {
    courses = await getCourses() // Supabase query, runs server-side only
  } catch {
    isError = true
  }
  return <DashboardView initialCourses={courses} isError={isError} />
}
```

#### 2. Client boundary at DashboardView
`DashboardView` is the single `"use client"` entry point for all dashboard interactivity. It receives pre-fetched data as props (no client-side fetching). Inside it manages:
- Roadmap task state (check-off, add new milestones)
- Pomodoro timer (`useRef`-based interval, `useCallback` for completion)
- Tab switching, AI coach task injection
- `visualState` derived (not stored) from props — no simulation, no extra state

This keeps the client bundle small: only interactive leaf components cross the client boundary.

#### 3. Layout state lifted to DashboardShell
Sidebar expanded/collapsed state lives in `DashboardShell` (`"use client"`), not in `Sidebar` itself. This allows the **main content padding** (`md:pl-64` vs `md:pl-20`) to be controlled from the same component that owns the layout — avoiding prop drilling through `children` or a global store.

```ts
// dashboard-shell.tsx
const [isSidebarExpanded, setIsSidebarExpanded] = React.useState(true)
// Passes both to Sidebar; adjusts pl- on the content wrapper
```

#### 4. Supabase access is server-only
`lib/queries/courses.ts` imports from `lib/supabase/server` — the server-side Supabase client — and is only ever called from Server Components. Environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are exposed to the client only for the anon key (intentionally public), while any service-role keys stay server-only.

#### 5. Retry without a full page reload
The `[Retry]` button in the error state calls `router.refresh()` from `next/navigation`. This re-runs the Server Component tree (re-fetches from Supabase) without a full browser navigation, and the result flows back into the already-mounted client tree — similar to a targeted server-driven update.

---

## 🛠 Tech Stack

| Technology | Version | Role |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.x (Turbopack) | Framework, App Router, SSR |
| [React](https://react.dev) | 19.x | UI rendering |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | v4 (`@theme inline`) | Styling, design tokens |
| [Framer Motion](https://www.framer.com/motion/) | 11.x | Animations & gestures |
| [shadcn/ui](https://ui.shadcn.com) | latest | Accessible UI primitives |
| [Supabase](https://supabase.com) | latest | PostgreSQL database + client |
| [Lucide React](https://lucide.dev) | latest | Icon set |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `>= 20`
- A [Supabase](https://supabase.com) project with a `courses` table

### Supabase `courses` table schema
```sql
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0,
  icon_name text not null default 'code',
  created_at timestamptz not null default now()
);
```

### Setup

```bash
# Clone
git clone https://github.com/Gyanshu-tiwari/next-gen-dashboard.git
cd next-gen-dashboard

# Install
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
next-gen-dashboard/
├── app/
│   ├── layout.tsx              # Root layout — wraps everything in DashboardShell
│   ├── page.tsx                # Home (/) — Server Component, fetches courses
│   ├── globals.css             # Tailwind v4 @theme tokens + CSS variables
│   ├── 404.webp                # Illustration for under-development pages
│   ├── courses/page.tsx        # → UnderDevelopment
│   ├── explore/page.tsx        # → UnderDevelopment
│   ├── analytics/page.tsx      # → UnderDevelopment
│   ├── categories/page.tsx     # → UnderDevelopment
│   └── settings/page.tsx       # → UnderDevelopment
├── components/
│   ├── layout/
│   │   ├── dashboard-shell.tsx     # Client: sidebar state, sticky header
│   │   ├── sidebar.tsx             # Client: collapsible nav, active indicators
│   │   ├── mobile-nav.tsx          # Client: hamburger drawer
│   │   └── under-development.tsx   # Client: full-width WIP page
│   └── dashboard/
│       ├── dashboard-view.tsx      # Client: courses, roadmap, widgets, timer
│       ├── course-card.tsx         # Client: individual course card
│       ├── hero-tile.tsx           # Circular progress tile
│       ├── activity-tile.tsx       # Study-hour chart tile
│       └── stagger-container.tsx   # Animation stagger wrapper
├── lib/
│   ├── queries/courses.ts      # getCourses() — server-only Supabase query
│   ├── supabase/server.ts      # Server-side Supabase client
│   └── utils.ts                # cn() helper
├── types/
│   └── course.ts               # Course interface
└── public/                     # Static assets
```

---

## 🎨 Design Tokens

Defined in `app/globals.css` via Tailwind v4's `@theme inline`:

| Token | Value | Usage |
|---|---|---|
| `--color-brand` | `#7C6CF5` | Primary violet accent |
| `--color-brand-hover` | `#9B8DFF` | Hover / lighter tint |
| `--color-text-primary` | `#F4F5F7` | Main text |
| `--color-card-surface` | `#2A2D40` | Card & panel backgrounds |
| `--spacing-4\.5` | `1.125rem` | Custom icon sizing (`h-4.5`) |
| `--spacing-5\.5` | `1.375rem` | Custom icon sizing (`h-5.5`) |
| `--spacing-9\.5` | `2.375rem` | Custom input height (`h-9.5`) |

---

## 🔧 Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📄 License

MIT — built for educational demonstration purposes.

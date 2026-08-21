---
name: stockit-frontend-feature-flow
description: Frontend engineering skill for StockIt's React 19, Tailwind CSS v4, TanStack Query, and feature-slice architecture (features/* -> api, hooks, components, pages).
risk: safe
source: local
date_added: "2026-08-21"
---

# StockIt Frontend Feature Architecture & Workflow

## When to Use
- Adding or modifying UI components, hooks, queries, or pages in `frontend/`.
- Integrating backend APIs with TanStack React Query hooks.
- Working on interactive charts (Recharts), financial tables, animations (Framer Motion), or state management.

## 🎯 Architecture & Structure

The frontend is organized by **Feature Slices** in `frontend/src/features/<feature_name>/`:

```
frontend/src/features/<feature>/
├── api/             # API caller functions using axios instance
│   └── <feature>Api.js
├── hooks/           # TanStack useQuery / useMutation custom hooks
│   └── use<Feature>.js
├── components/      # Feature-specific presentational & interactive components
│   └── <FeatureCard>.jsx
└── pages/           # View / Page level component composition
    └── <FeaturePage>.jsx
```

### Shared / Global Directories:
- `src/services/api.js`: Pre-configured Axios client with baseURL and credential cookies (`withCredentials: true`).
- `src/components/`: Reusable, generic UI primitives (buttons, modals, loaders, cards).
- `src/context/`: Global React context (e.g. AuthContext).
- `src/layouts/`: App layout wrappers, headers, sidebars, and navigation bars.

---

## 🛠️ Preferred Tech Stack & Patterns

- **React:** React 19 with functional components and modern hooks.
- **Data Fetching:** `@tanstack/react-query` with proper query keys and cache invalidation on mutations.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`).
- **Icons & Visuals:** `lucide-react` for icons, `recharts` for financial charts.
- **Animations:** `framer-motion` for fluid page and card transitions.
- **Notifications:** `react-hot-toast` for user feedback.

---

## 🚀 Frontend Development Commands

```bash
# Start Vite development server (http://localhost:5173)
npm --prefix frontend run dev

# Run ESLint check
npm --prefix frontend run lint

# Build for production
npm --prefix frontend run build
```

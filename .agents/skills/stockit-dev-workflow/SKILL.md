---
name: stockit-dev-workflow
description: Fullstack operations, debugging, and command execution guide for the StockIt project (concurrent backend/frontend dev servers, env configs, cookie auth, and testing).
risk: safe
source: local
date_added: "2026-08-21"
---

# StockIt Fullstack Development & Operations Workflow

## When to Use
- Starting, restarting, or debugging the StockIt application development servers.
- Managing environment variables, database connections, and authentication cookies.
- Running builds, linting, or verifying end-to-end integration across frontend and backend.

## 💻 Common Commands & Lifecycle

### 1. Running the Full Stack
- **Backend Server (Express / tsx watch):**
  ```powershell
  npm --prefix backend run dev
  ```
  - Listens on `http://localhost:3000` (or `PORT` defined in `backend/config.env`).
  - Automatically reloads on file changes via `tsx watch`.
  - Connects to MongoDB with connection string from `config.env`.

- **Frontend Server (Vite):**
  ```powershell
  npm --prefix frontend run dev
  ```
  - Serves application at `http://localhost:5173`.
  - Configured with Hot Module Replacement (HMR) and Tailwind CSS v4.

### 2. Code Quality & Linting
- **Check Backend:**
  ```powershell
  npm --prefix backend run lint
  ```
- **Check Frontend:**
  ```powershell
  npm --prefix frontend run lint
  ```

### 3. Production Build Verification
- **Build Frontend:**
  ```powershell
  npm --prefix frontend run build
  ```

---

## 🔐 Auth & Network Configuration

- **CORS Setup:** Backend allows origin `http://localhost:5173` with `credentials: true`.
- **JWT Cookies:** Auth tokens are passed via HTTP-only cookies (`cookieParser`). Ensure API calls from frontend Axios instance include `withCredentials: true`.
- **Environment Files:**
  - Backend: `backend/config.env` (`DATABASE`, `DATABASE_PASSWORD`, `JWT_SECRET`, `PORT`, etc.)
  - Frontend: `frontend/.env` (`VITE_API_URL`)

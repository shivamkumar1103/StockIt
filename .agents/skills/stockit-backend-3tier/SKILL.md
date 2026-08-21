---
name: stockit-backend-3tier
description: Specialized engineering skill for building and maintaining StockIt's 3-Tier Layered Backend Architecture (Express 5, Mongoose 8, ESM, Routes -> Controllers -> Services -> Repositories -> Models).
risk: safe
source: local
date_added: "2026-08-21"
---

# StockIt 3-Tier Backend Architecture & Pattern Guide

## When to Use
- Adding or modifying backend endpoints, APIs, or database queries in `backend/`.
- Creating new backend modules or refactoring existing controller/service/repository layers.
- Handling transactions, user authentication, portfolio calculation, trading orders, or third-party stock data APIs.

## 🎯 Architectural Principles & Separation of Concerns

The backend strictly follows a **3-Tier Architecture**:

```
Routes  ──>  Controllers  ──>  Services  ──>  Repositories  ──>  Models / DB
```

### 1. Routes (`backend/routes/`)
- Define HTTP method bindings (`router.route('/').get(...).post(...)`).
- Attach authentication and permission middleware (e.g. `authController.protect`).

### 2. Controllers (`backend/controllers/`)
- Extract request parameters, body, query strings, and authenticated user (`req.user.id`).
- Call corresponding service functions.
- Format and send HTTP response: `res.status(statusCode).json({ status: "success", data })`.
- **Never** perform direct database queries or complex business logic inside controllers.

### 3. Services (`backend/services/`)
- Contain **all** core business logic, PnL calculations, validation rules, and caching.
- Coordinate multiple repository calls when transactions or aggregations are involved.
- Throw `AppError(message, statusCode)` on business violations or resource absence.
- Return pure data objects to the controller.

### 4. Repositories (`backend/repository/`)
- Encapsulate all direct database queries using Mongoose models (e.g., `Model.find()`, `Model.findByIdAndUpdate()`, `Model.create()`).
- Keep database query implementation decoupled from business logic.

### 5. Models (`backend/models/`)
- Define Mongoose schemas with schema validations, pre/post hooks, and virtuals.

---

## 🛠️ Code Conventions & Patterns

### Error Handling
- Use `AppError` from `backend/utils/appError.js`:
  ```javascript
  import AppError from "../utils/appError.js";
  if (!record) {
    throw new AppError(`Record with id ${id} not found`, 404);
  }
  ```

### Standard ESM Imports
- Node.js ESM format is enabled (`"type": "module"`).
- Always include the `.js` extension in local file imports (e.g., `import * as StockService from "../services/stockService.js";`).

### Development Commands
- Start dev server with watch mode and environment:
  ```bash
  npm --prefix backend run dev
  # Executes: tsx watch --env-file=config.env server.js
  ```
- Linting backend code:
  ```bash
  npm --prefix backend run lint
  ```

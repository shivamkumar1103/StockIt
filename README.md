# 📈 StockIt — Real-Time Paper Trading & Market Analytics Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-v20%20%7C%20v22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express 5](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis 7](https://img.shields.io/badge/Redis-7.x-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

**StockIt** is a full-stack, enterprise-grade simulated stock trading and portfolio analytics platform. Designed to mimic live financial markets, it provides real-time streaming price updates, interactive historical charts, simulated order execution, wallet management, watchlists, financial news, and portfolio tracking.

---

## 🌟 Key Features

### ⚡ Real-Time Market Streaming & WebSocket Engine
- **Live Finnhub Ingestion**: Upstream WebSocket connection ingests real-time ticks for top US equities (AAPL, MSFT, NVDA, GOOGL, TSLA, etc.).
- **High-Throughput Downstream Broadcast**: Batches market updates every 150ms and distributes them to connected frontend clients via a shared HTTP/WS port (`/ws/market`).
- **Resilient Connection Handling**: Auto-reconnect with exponential backoff, dead-client cleanup via 30s heartbeat ping/pong, and fail-open initial snapshot delivery.

### 💼 Paper Trading & Portfolio Management
- **Instant Simulated Order Execution**: Execute Market Buy and Sell orders with validation against real-time quotes and cash balances.
- **Portfolio Tracking**: Real-time valuation of holdings, average buy price, current valuation, asset distribution, and realized/unrealized profit-and-loss (P&L).
- **Virtual Wallet & Audit Trail**: Virtual cash deposits and automatic transaction logs for orders, trades, and portfolio history.

### 📊 In-Depth Market Research & Analytics
- **Interactive Stock Charts**: Candlestick and line charts powered by Twelve Data and Recharts across multiple timeframes.
- **Company Profiles & Financial Metrics**: Business descriptions, market capitalization, 52-week highs/lows, and fundamental data.
- **Curated Financial News**: Live market news feed covering global equities and macroeconomic developments.
- **Personalized Watchlists**: Instant one-click watchlist additions/removals with live updates.

### 🛡️ Enterprise Security & Modern Authentication
- **Secure Cookie Transport**: Stateless JWT authentication stored in HTTP-only, SameSite-protected cookies.
- **Complete Auth Flow**: Sign up, login, email verification via branded HTML emails, forgot/reset password workflows, and password update.
- **Profile Customization**: Avatar image uploads processed, cropped, and optimized via Sharp.
- **Centralized Error Handling**: Unified operational error pipeline (`AppError`) with structured JSON error responses.

---

## 🏗️ Architecture & Technology Stack

StockIt follows a strict separation of concerns across both frontend and backend architectures:

```
[ Frontend: React 19 + Vite + TanStack Query ]
                  │  ▲
   HTTP (Axios)   │  │  WebSocket (/ws/market)
  (withCookies)   ▼  │  (Live Ticks & Snapshots)
[ Backend: Express 5 + Node.js ESM ]
        │
   3-Tier Pattern: Routes ──► Controllers ──► Services ──► Repositories
        │                                        │
        ▼                                        ▼
 [ MongoDB / Mongoose 8 ]               [ Redis 7 LRU Cache ]
 (Users, Wallets, Trades,              (Quotes, Profiles, Search,
  Orders, Watchlists)                   Market Home Data)
```

### Technology Matrix

| Layer | Technologies |
|---|---|
| **Frontend UI & State** | React 19, Vite 8, TanStack Query v5, React Router v7, Framer Motion, Recharts |
| **Styling & Components**| Tailwind CSS v4, Base UI, Shadcn UI, Lucide Icons, React Hot Toast |
| **Backend Framework**   | Express 5 (Node.js ESM), `tsx` watch runner, Morgan |
| **Real-time Gateway**   | `ws` (WebSocket) with shared HTTP upgrade handling |
| **Database & Caching**  | MongoDB (Mongoose 8), Redis 7 (`ioredis`, LRU eviction, fail-open) |
| **Auth & Security**     | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser`, CORS |
| **Email & Templating**  | `@react-email/components`, Nodemailer, Brevo SMTP |
| **External Market APIs**| Finnhub API (WebSocket & REST), Twelve Data API (Time Series) |
| **DevOps & Containers** | Docker, Docker Compose, Alpine Linux images |

---

## 📁 Repository Structure

```
stockIt/
├── backend/
│   ├── controllers/          # Request handling & HTTP response formatting
│   ├── middleware/           # Auth protection, cache, upload/resize
│   ├── models/               # Mongoose schemas (User, Wallet, Trade, Order, etc.)
│   ├── repository/           # Direct MongoDB database access layer
│   ├── routes/               # API route definitions & route protection
│   ├── services/             # Core business logic, P&L math, caching orchestration
│   ├── templates/            # React Email transactional templates
│   ├── utils/                # Redis client, AppError, email sender
│   ├── websocket/            # Finnhub upstream client & market WebSocket gateway
│   ├── app.js                # Express app configuration & middleware
│   ├── server.js             # Server bootstrap & graceful shutdown hooks
│   ├── Dockerfile            # Production Node 22 backend container definition
│   └── package.json
│
├── frontend/
│   ├── public/               # Static assets & favicon
│   ├── src/
│   │   ├── app/              # Root App component, styles, and entry point
│   │   ├── components/       # Reusable primitives (Buttons, Modals, Tooltips)
│   │   ├── context/          # React Contexts (AuthProvider)
│   │   ├── features/         # Feature-sliced modules
│   │   │   ├── account/      # Settings, password update, profile management
│   │   │   ├── auth/         # Login, Register, Forgot Password, ProtectedRoute
│   │   │   ├── dashboard/    # Portfolio summary, market overview, quick actions
│   │   │   ├── market/       # Global market overview, top gainers/losers
│   │   │   ├── news/         # Financial news articles and sentiment
│   │   │   ├── portfolio/    # Holdings table, asset breakdown, P&L cards
│   │   │   ├── search/       # Symbol search modal & autocomplete
│   │   │   ├── stockDetail/  # Candlestick chart, company bio, buy/sell modal
│   │   │   └── support/      # Help center & FAQ pages
│   │   ├── layouts/          # Navigation sidebar, topbar, and main shell
│   │   └── services/         # Axios instance configured with credentials
│   ├── Dockerfile            # Frontend container definition
│   └── package.json
│
├── docker-compose.yml        # Multi-container orchestration (Redis, Backend, Frontend)
└── README.md
```

---

## ⚙️ Prerequisites & External Services

Before running StockIt locally, ensure you have the following installed and configured:

1. **Node.js**: v20.x or v22.x LTS ([Download Node.js](https://nodejs.org/))
2. **MongoDB**: Local MongoDB instance or free cloud database via [MongoDB Atlas](https://www.mongodb.com/atlas)
3. **Redis**: Local Redis v7+ or via Docker (`docker run -p 6379:6379 redis:7-alpine`)
4. **Market Data API Keys**:
   - **Finnhub**: Free API key from [finnhub.io](https://finnhub.io/) (quotes, profile, live WebSocket ticks)
   - **Twelve Data**: Free API key from [twelvedata.com](https://twelvedata.com/) (time-series chart data)
5. **Email Provider (Optional for password resets)**:
   - [Brevo](https://www.brevo.com/) (formerly Sendinblue) or standard SMTP credentials

---

## 🔑 Environment Configuration

### 1. Backend Configuration (`backend/config.env`)

Create `backend/config.env` using the template below:

```ini
# Environment & Server
NODE_ENV=development
PORT=3000

# Database (MongoDB)
# If using MongoDB Atlas:
DATABASE=mongodb+srv://<username>:<db_password>@cluster0.mongodb.net/stockit?retryWrites=true&w=majority
DATABASE_PASSWORD=your_mongodb_password
# Or if using local MongoDB:
# DATABASE=mongodb://localhost:27017/stockit
# DATABASE_PASSWORD=

# Authentication & JWT
JWT_SECRET=super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

# Email Delivery (SMTP / Brevo)
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USERNAME=your_brevo_login
EMAIL_PASSWORD=your_brevo_smtp_key
EMAIL_FROM=noreply@stockit.com

# Market Data Providers
FINNHUB_API_KEY=your_finnhub_api_key
FINNHUB_BASE_URL=https://finnhub.io/api/v1

TWELVE_DATA_API_KEY=your_twelve_data_api_key
TWELVE_DATA_BASE_URL=https://api.twelvedata.com

# Caching Layer (Redis)
REDIS_URL=redis://localhost:6379
CACHE_ENABLED=true
```

> **Note:** If running inside Docker Compose, `REDIS_URL` will be overridden automatically to `redis://redis:6379`.

### 2. Frontend Configuration (`frontend/.env`)

Create `frontend/.env` using the template below:

```ini
VITE_API_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000/ws/market
```

---

## 🚀 Quick Start Guide

You can run StockIt using either **Docker Compose** (recommended for full-stack isolation) or **Local Node.js Development**.

### Option A: Using Docker Compose (Recommended)

Docker Compose starts Redis (with 256MB LRU policy), the backend, and the Vite frontend simultaneously.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/stockIt.git
   cd stockIt
   ```

2. **Configure environment files:**
   - Create `backend/config.env`
   - Create `frontend/.env`

3. **Start all services:**
   ```bash
   docker compose up --build
   ```

4. **Access the application:**
   - **Frontend UI:** [http://localhost:5173](http://localhost:5173)
   - **Backend API:** [http://localhost:3000/api/v1](http://localhost:3000/api/v1)
   - **Market WebSocket:** `ws://localhost:3000/ws/market`
   - **Redis Cache:** `localhost:6379`

To stop the containers:
```bash
docker compose down
```

---

### Option B: Local Development Setup

If running without Docker, start Redis, the backend server, and the frontend server separately:

#### 1. Start Redis
```bash
# Using Docker for Redis only:
docker run -d --name stockit-redis -p 6379:6379 redis:7-alpine

# Or start your native local redis-server:
redis-server
```

#### 2. Start the Backend
```bash
cd backend
npm install
npm run dev
```
> The backend server starts with live reloading on [http://localhost:3000](http://localhost:3000).

#### 3. Start the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
> The Vite development server starts with HMR on [http://localhost:5173](http://localhost:5173).

---

## 📡 API & WebSocket Reference

### REST API Endpoints

#### Authentication & User (`/api/v1/users`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/signup` | Register new account & trigger verification email | No |
| `POST` | `/login` | Authenticate user & issue HTTP-only cookie | No |
| `POST` | `/logout` | Invalidate session cookie | Yes |
| `GET` | `/verifyEmail/:token` | Verify email address | No |
| `POST` | `/forgotPassword` | Send password reset token to email | No |
| `PATCH`| `/resetPassword/:token`| Set new password with token | No |
| `GET` | `/me` | Get currently logged-in user profile | Yes |
| `PATCH`| `/updateMe` | Update profile information & upload avatar | Yes |
| `PATCH`| `/updateMyPassword` | Change user password | Yes |
| `DELETE`| `/deleteMe` | Deactivate account | Yes |

#### Market & Stocks (`/api/v1/stocks`)
| Method | Endpoint | Description | Caching |
|---|---|---|---|
| `GET` | `/home` | Market summary, trending, gainers, losers | Redis |
| `GET` | `/quote/:symbol` | Live stock quote price & daily change | Redis (Finnhub) |
| `GET` | `/profile/:symbol` | Company profile, industry & capitalization | Redis (Finnhub) |
| `GET` | `/search?q=:query` | Autocomplete search for equities | Redis |
| `GET` | `/news` | General financial news headlines | Redis |
| `GET` | `/chart/:symbol?interval=:int` | Historical time-series chart data | Memory (Twelve Data) |

#### Watchlist (`/api/v1/watchlist`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/` | Fetch user's saved watchlist | Yes |
| `POST` | `/` | Add symbol to watchlist (`{ "symbol": "AAPL" }`) | Yes |
| `DELETE`| `/` | Remove symbol from watchlist (`{ "symbol": "AAPL" }`) | Yes |

#### Trading & Orders (`/api/v1/trade`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/buy` | Execute market buy order (`{ symbol, quantity }`) | Yes |
| `POST` | `/sell` | Execute market sell order (`{ symbol, quantity }`) | Yes |

#### Portfolio & Wallet (`/api/v1/trading`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/portfolio` | User portfolio summary & holdings breakdown | Yes |
| `GET` | `/getMyStocks` | List of currently held equities | Yes |
| `GET` | `/wallet` | Current cash balance & equity value | Yes |
| `GET` | `/orders` | Order execution history | Yes |
| `GET` | `/transactions` | Wallet transaction ledger | Yes |
| `GET` | `/trades` | Completed trade logs | Yes |

---

### WebSocket Protocol (`/ws/market`)

Connect to the live feed at:
```
ws://localhost:3000/ws/market
```

- **Initial Handshake**: On connection, the server immediately sends a full market snapshot:
  ```json
  {
    "type": "SNAPSHOT",
    "data": {
      "AAPL": { "price": 224.23, "timestamp": 1726402800000 },
      "MSFT": { "price": 431.15, "timestamp": 1726402800000 }
    }
  }
  ```
- **Live Market Updates**: Broadcasted every 150ms whenever trade updates are received from Finnhub:
  ```json
  {
    "type": "Market-Update",
    "data": {
      "NVDA": { "price": 128.45, "volume": 120, "timestamp": 1726402801250 }
    }
  }
  ```
- **Keepalive Ping/Pong**: Server transmits WebSocket `ping` every 30 seconds. Clients must respond with standard `pong` frames to maintain connection.

---

## 🧪 Available Scripts

### Backend (`/backend`)
```bash
# Start development server with tsx watch and config.env
npm run dev

# Start standalone WebSocket process (if running WS independently)
npm run dev:ws

# Production start
npm run start
```

### Frontend (`/frontend`)
```bash
# Start Vite development server (HMR enabled)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint linter
npm run lint
```

---

## 🛡️ Architecture & Design Principles

StockIt implements industry-standard architectural best practices:

1. **Decoupled 3-Tier Layered Backend**:
   - `Routes` bind endpoints and apply middleware.
   - `Controllers` validate request inputs and package responses.
   - `Services` implement core business math, portfolio valuations, and transaction orchestration.
   - `Repositories` encapsulate all Mongoose database queries.
2. **Fail-Open Caching**:
   - In case Redis goes down, `connectRedis()` catches the error and the application continues to serve requests directly from the database or external APIs without crashing.
3. **Graceful Server Shutdown**:
   - Intercepts `SIGINT`, `SIGTERM`, and unhandled errors to gracefully close WebSocket connections first, followed by HTTP sockets, Redis, and MongoDB connections in strict sequence to avoid hung socket descriptors.
4. **Optimistic UI & Cache Synchronization**:
   - TanStack Query keeps server state in sync, utilizing automatic query invalidation upon placing trades or updating watchlists for instant UI updates.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

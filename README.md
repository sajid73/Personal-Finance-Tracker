# Personal Finance Tracker

A full-stack mobile application for tracking personal income and expenses. Built with React Native (Expo) for the mobile client and Node.js for the backend API, with authentication powered by Clerk and persistent storage via a serverless PostgreSQL database.

---

## Overview

This project was built to demonstrate end-to-end mobile application development, covering authentication flows, RESTful API design, rate limiting, database integration, and production-ready deployment patterns.

**Key features:**
- User authentication with email/password and OTP verification (Clerk)
- Add, view, and delete income and expense transactions
- Dashboard summary showing balance, total income, and total expenses
- Pull-to-refresh and real-time data updates
- API rate limiting via Upstash Redis
- Scheduled background jobs with cron

---

## Tech Stack

### Mobile (React Native / Expo)
| Technology | Purpose |
|---|---|
| React Native + Expo SDK 54 | Cross-platform mobile framework |
| Expo Router v6 | File-based navigation |
| Clerk (`@clerk/expo` v3) | Authentication |
| React Navigation | Stack and tab navigation |
| `react-native-safe-area-context` | Safe area handling |
| `react-native-keyboard-aware-scroll-view` | Keyboard-aware form layouts |

### Backend (Node.js)
| Technology | Purpose |
|---|---|
| Express.js | REST API framework |
| Neon Database (`@neondatabase/serverless`) | Serverless PostgreSQL |
| Upstash Redis + `@upstash/ratelimit` | API rate limiting |
| `cron` | Scheduled background jobs |
| `dotenv` | Environment variable management |
| `nodemon` | Development auto-restart |

---

## Project Structure

```
expenss-tracker/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── db.js               # Neon database connection
│       │   ├── upstash.js          # Upstash Redis client
│       │   └── cron.js             # Scheduled jobs
│       ├── controllers/
│       │   └── transactionsController.js
│       ├── middleware/
│       │   └── rateLimiter.js
│       ├── routes/
│       │   └── transactionsRoute.js
│       └── server.js
│
└── mobile/
    └── app/
        ├── (auth)/
        │   ├── _layout.jsx
        │   ├── sign-in.jsx
        │   └── sign-up.jsx
        ├── (root)/
        │   ├── _layout.jsx
        │   ├── index.jsx           # Home / dashboard
        │   └── create.jsx          # Add transaction
        ├── _layout.jsx             # Root layout with ClerkProvider
        └── index.jsx               # Auth redirect entry point
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- A [Clerk](https://clerk.com) account
- A [Neon](https://neon.tech) serverless PostgreSQL database
- An [Upstash](https://upstash.com) Redis instance

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` root:
   ```env
   DATABASE_URL=your_neon_database_connection_string
   UPSTASH_REDIS_REST_URL=your_upstash_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
   PORT=5001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5001`.

---

### Mobile Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `mobile/` root:
   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   EXPO_PUBLIC_API_URL=http://localhost:5001/api
   ```

4. Start the Expo development server:
   ```bash
   npm start
   ```

5. Scan the QR code with the **Expo Go** app, or press `a` for Android emulator / `i` for iOS simulator.

---

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/transactions/:userId` | Fetch all transactions for a user |
| `POST` | `/transactions` | Create a new transaction |
| `DELETE` | `/transactions/:id` | Delete a transaction by ID |
| `GET` | `/transactions/summary/:userId` | Get balance, income, and expense summary |

---

## Development Notes

- Authentication is handled entirely by Clerk. The mobile app uses Clerk's `@clerk/expo` v3 SDK with the new `signIn.password()` / `signUp.password()` API and field-level error handling.
- The backend uses ES Modules (`"type": "module"` in `package.json`).
- Rate limiting is applied per IP using Upstash Redis, protecting the API from abuse.
- The Neon database uses the serverless driver, making it suitable for deployment on platforms like Render or Railway without connection pooling configuration.

---

## Commit History Highlights

```
Feature: endpoints created
feat: rate limiter added
refactor: endpoints moved to routes folder
feat(mobile): Authentication screen done
fix: Authentication bug fixed - updated to latest clerk
feat(mobile): summary/home screen added
```
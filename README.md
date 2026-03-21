# 💼 Personal Finance Tracker - Full-Stack Mobile App with React Native & Express 🚀

## 🎯 What I've Build

This project demonstrates the full-stack development of a **personal finance tracker mobile app** that integrates with a backend, implements authentication, and uses cloud-based storage.

✅ Cross-platform support for **iOS & Android** (simulator or real device)  
✅ Leverages my existing **React** knowledge  
✅ No need for Swift, Kotlin, or native modules  
✅ Complete full-stack solution in **under 4 hours**

---

## 🧑‍🍳 App Features Overview

- 🔐 **Authentication** with email verification using **Clerk**
- 📝 **Signup & Login** flows with a 6-digit email code
- 🏠 **Home Screen** displaying current balance & transaction history
- ➕ **Create Screen** to add **income** or **expense** transactions
- 🔄 **Pull to refresh** functionality for live data updates
- 🗑️ **Delete transactions** to maintain an accurate balance
- 🚪 **Logout** functionality to navigate back to the login screen

---

## 🧠 What I've Learned

- ⚙️ How to build and deploy an **Express API** with **PostgreSQL** using **Neon**
- 🔐 Implementing authentication & email verification with **Clerk**
- 📲 Developing a full mobile app with **React Native & Expo**
- 🧵 Managing state and navigation using **React Navigation**
- 🛡️ Understanding and implementing **Rate Limiting** using **Redis**
- 🚀 Deploying both backend & mobile with cloud-based tools
- 🧪 A beginner-friendly introduction to full-stack React Native development

---

## 📁 .env Setup

### ⚙️ Backend (`/backend`)

```bash
PORT=5001
NODE_ENV=development

CLERK_PUBLISHABLE_KEY=<clerk_publishable_key>
CLERK_SECRET_KEY=<clerk_secret_key>

DATABASE_URL=<neon_postgres_connection_url>

REDIS_URL=<redis_connection_url>
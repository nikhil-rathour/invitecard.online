# InviteCard.online

Premium Indian digital invitation platform (MERN + Vite).

This repository currently includes **Phase 0 + MVP foundation**: browse templates, preview, create a draft invitation, and view drafts in a dashboard. Payments, JWT auth, WhatsApp Business API, and publishing are intentionally not included yet.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, TanStack Query, Axios, React Hook Form, Zod
- Backend: Node.js, Express, MongoDB, Mongoose
- API: REST under `/api/v1`

## Project structure

```
invitecard.online/
  client/     React + Vite app
  server/     Express API
  Ai/         Product docs (PRD, architecture, design, tasks)
  docs/       Engineering notes
```

## Prerequisites

- Node.js 20+
- MongoDB running locally, or a MongoDB Atlas URI

## Setup

```bash
npm run install:all
```

Copy environment files:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

Update `MONGODB_URI` in `server/.env` if you are not using local MongoDB.

Seed sample templates:

```bash
cd server
npm run seed
```

## Run

From the repo root (two terminals):

```bash
npm run dev:server
npm run dev:client
```

- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/v1/health

The Vite dev server proxies `/api` to the backend.

## Current user journey

Home → Templates → filter → Template detail → Create invitation → preview → Save draft → Dashboard

Authentication is mocked with a development owner id (`DEV_OWNER_ID`). Replace this in the auth phase.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev:client` | Vite frontend |
| `npm run dev:server` | Express API with watch |
| `npm run install:all` | Install root, client, and server packages |

## What is not in this phase

Payment, Razorpay, checkout, subscriptions, coupons, orders, WhatsApp Business API, bulk messaging, advanced analytics, Cloudinary uploads, and microservices.

# Mini Lead Distribution System

A full stack lead distribution platform built using Next.js and MongoDB.

## Features

- Customer lead submission
- Fair provider allocation
- Mandatory provider assignment rules
- Monthly quota management
- Real-time dashboard updates
- Webhook simulation
- Idempotency protection
- Concurrency testing

---

## Tech Stack

- Next.js
- MongoDB Atlas
- Mongoose
- Tailwind CSS

---

## Routes

### Customer Form
/request-service

### Provider Dashboard
/dashboard

### Test Tools
/test-tools

---

## Allocation Logic

- Service 1 always includes Provider 1
- Service 2 always includes Provider 5
- Service 3 always includes Provider 1 and Provider 4

Remaining providers are assigned using persistent round-robin allocation.

Each lead is assigned to exactly 3 providers.

---

## Duplicate Prevention

Duplicate leads are prevented using a database-level unique compound index:

- phone
- serviceType

---

## Real-Time Updates

Dashboard updates automatically every 3 seconds using polling.

---

## Webhook Idempotency

Webhook calls are tracked using unique webhook IDs.

Repeated webhook calls do not duplicate quota reset effects.

---

## Concurrency Handling

Concurrent lead generation is tested using Promise.allSettled.

The system safely handles partial failures without crashing.

---

## Setup Instructions

```bash
npm install
npm run dev
```

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
```

Run locally:

```bash
npm run dev
```
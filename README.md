# FeedbackBoard

A simple internal tool for viewing and managing customer feedback.

## Features

- View list of customer feedback
- Filter by status (All / Active / Resolved)
- Open a feedback item to see details
- Add comments
- Mark feedback as resolved (or reopen)

## Stack

- **Frontend:** React 18, Vite, TypeScript, MUI
- **Backend:** Express, in-memory storage (no database, no auth)

All dependencies are **public** (npm and Google Fonts). Candidates can clone and run without access to private registries or repos.

## Run locally

```bash
npm install
npm run dev
```

- App: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3001](http://localhost:3001)

## API (for reference)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/feedback` | List all feedback |
| GET | `/api/feedback/:id` | Get one feedback item |
| PATCH | `/api/feedback/:id` | Update feedback (body: `{ "status": "Active" \| "Resolved" }`) |
| GET | `/api/feedback/:id/comments` | List comments for a feedback item |
| POST | `/api/feedback/:id/comments` | Add comment (body: `{ "text": "..." }`) |

---

## For interviewers

This repo is set up for a **technical interview** focused on how candidates use AI to deliver code. The codebase is:

- **Small** – understandable in ~10 minutes
- **Slightly messy** – not over-engineered
- **Seeded with intentional issues** – for diagnosis and improvement


# FeedbackBoard – Interviewer notes (do not share with candidates)

This document describes the **intentional flaws** seeded in the repo. Use it to calibrate expectations and to recognize strong vs weak answers.

---

## Seeded issues (and where to look)

| Issue | What’s wrong | Where |
|-------|----------------|-------|
| **Resolved filter broken** | Filter compares API status (`'Active'` / `'Resolved'`) to lowercase select value (`'active'` / `'resolved'`), so “Resolved” shows nothing. | `src/components/FeedbackList.tsx` – filter comparison |
| **Status reverts after refresh** | Backend returns updated object but never mutates the in-memory array, so updates are not persisted. | `server/store.js` – `updateFeedbackStatus()` |
| **Comments not persisted** | Backend `addComment` never writes to `commentsByFeedbackId`, so new comments disappear on refresh. | `server/store.js` – `addComment()` |
| **Slow filtering** | No memoization for sorted/filtered list + artificial 30ms busy loop; runs on every render. | `src/components/FeedbackList.tsx` – `sortedAndFiltered` |
| **LLM-style anti-patterns** | Inline styles, no loading/error state, possible race in `useEffect`; generally “works but messy.” | `src/components/CommentSection.tsx` |
| **Poor API error handling** | `GET /api/feedback/:id` calls `getFeedbackById()` with no try/catch; invalid id throws and becomes 500. | `server/index.js` – `GET /api/feedback/:id` |
| **No loading states** | No spinners or skeletons when fetching feedback or comments. | App, FeedbackDetail, CommentSection |
| **Security (XSS)** | Comments rendered with `dangerouslySetInnerHTML` and no sanitization; user input can run script. | `src/components/CommentSection.tsx` – comment text |

---

## What good candidates do

- **Task 1:** Reproduce (e.g. mark resolved, check filter, refresh), inspect network (PATCH returns 200 but GET still old data), trace to server store vs filter logic, fix both persistence and filter comparison, test after fix.
- **Task 2:** Ask clarifying questions (priority enum, sorting, UX, defaults); make a minimal change; handle the “switch to tagging” curve ball without starting over blindly.
- **Task 3:** Call out duplication, missing loading/error handling, validation, coupling, over-fetching, types, re-renders, and the XSS risk; suggest concrete improvements (e.g. custom hook, sanitization).

Elite answer for Task 3 sounds like: *“This works, but the AI duplicated fetch logic—I’d extract a hook. We’re also trusting client input too much [sanitization / security].”*

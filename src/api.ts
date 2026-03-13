import type { Feedback, Comment, FeedbackTag } from './types'

const BASE = '/api'

export async function fetchFeedback(): Promise<Feedback[]> {
  const res = await fetch(`${BASE}/feedback`)
  if (!res.ok) throw new Error('Failed to fetch feedback')
  return res.json()
}

export async function fetchFeedbackById(id: string): Promise<Feedback> {
  const res = await fetch(`${BASE}/feedback/${id}`)
  if (!res.ok) throw new Error('Failed to fetch feedback')
  return res.json()
}

export async function updateStatus(id: string, status: 'Active' | 'Resolved'): Promise<Feedback> {
  const res = await fetch(`${BASE}/feedback/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update status')
  return res.json()
}

export async function fetchComments(feedbackId: string): Promise<Comment[]> {
  const res = await fetch(`${BASE}/feedback/${feedbackId}/comments`)
  if (!res.ok) throw new Error('Failed to fetch comments')
  return res.json()
}

export async function addComment(feedbackId: string, text: string): Promise<Comment> {
  const res = await fetch(`${BASE}/feedback/${feedbackId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error('Failed to add comment')
  return res.json()
}

// Let's add a function to fetch all available tags from the backend
// This ensures the frontend and backend stay in sync about available tags
export async function fetchAvailableTags(): Promise<FeedbackTag[]> {
  const res = await fetch(`${BASE}/tags`)
  if (!res.ok) throw new Error('Failed to fetch available tags')
  return res.json()
}

// Function to update the tags for a specific feedback item
// Note that the backend will validate the tags against the allowed list
export async function updateTags(id: string, tags: FeedbackTag[]): Promise<Feedback> {
  const res = await fetch(`${BASE}/feedback/${id}/tags`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tags }),
  })
  if (!res.ok) throw new Error('Failed to update tags')
  return res.json()
}

export type FeedbackStatus = 'Active' | 'Resolved'

export type FeedbackTag = 'Bug' | 'Feature Request' | 'UI/UX' | 'Performance' | 'Security' | 'Documentation'

export interface Feedback {
  id: string
  title: string
  description: string
  status: FeedbackStatus
  createdAt: string
  tags: FeedbackTag[]
}

export interface Comment {
  id: string
  text: string
  createdAt: string
}

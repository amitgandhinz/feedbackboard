// Let's define all the available tags that users can assign to feedback items
// These categories help organize and filter feedback more effectively
const AVAILABLE_TAGS = ['Bug', 'Feature Request', 'UI/UX', 'Performance', 'Security', 'Documentation']

const feedback = [
  {
    id: '1',
    title: 'Login page is slow on mobile',
    description: 'When I open the login page on my phone it takes 5+ seconds to become interactive.',
    status: 'Active',
    createdAt: '2025-02-20T10:00:00Z',
    tags: ['Performance', 'Bug'],
  },
  {
    id: '2',
    title: 'Dashboard charts not loading',
    description: 'The revenue chart on the dashboard sometimes shows a blank area until I refresh.',
    status: 'Active',
    createdAt: '2025-02-21T14:30:00Z',
    tags: ['Bug'],
  },
  {
    id: '3',
    title: 'Export to CSV fails for large datasets',
    description: 'Exporting more than 10k rows results in a timeout error.',
    status: 'Resolved',
    createdAt: '2025-02-18T09:15:00Z',
    tags: ['Bug', 'Performance'],
  },
  {
    id: '4',
    title: 'Notification sound too loud',
    description: 'The default notification sound is jarring. Can we have a volume setting?',
    status: 'Active',
    createdAt: '2025-02-22T11:00:00Z',
    tags: ['Feature Request', 'UI/UX'],
  },
  {
    id: '5',
    title: 'Dark mode contrast issues',
    description: 'In dark mode, some text is hard to read against the background.',
    status: 'Resolved',
    createdAt: '2025-02-19T16:45:00Z',
    tags: ['UI/UX', 'Bug'],
  },
  {
    id: '6',
    title: 'Search filters reset on page change',
    description: 'When I navigate to page 2 of results, my filter selections are lost.',
    status: 'Active',
    createdAt: '2025-02-23T08:20:00Z',
    tags: ['Bug'],
  },
]

const commentsByFeedbackId = {
  '1': [
    { id: 'c1', text: 'Reproduced on iOS Safari. Investigating.', createdAt: '2025-02-20T11:00:00Z' },
  ],
  '3': [
    { id: 'c2', text: 'Fixed in v2.1.0. We now stream the export.', createdAt: '2025-02-19T10:00:00Z' },
  ],
}

function getFeedback() {
  return feedback
}

function getFeedbackById(id) {
  const item = feedback.find((f) => f.id === id)
  if (!item) throw new Error('Feedback not found')
  return item
}

function updateFeedbackStatus(id, status) {
  const index = feedback.findIndex((f) => f.id === id)
  if (index === -1) throw new Error('Feedback not found')
  const updated = { ...feedback[index], status }
  // Only persist if status actually changed to avoid unnecessary writes
  if (updated.status !== status) {
    feedback[index] = updated
  }
  return updated
}

function getComments(feedbackId) {
  return commentsByFeedbackId[feedbackId] || []
}

function addComment(feedbackId, text) {
  const id = `c${Date.now()}`
  const comment = { id, text, createdAt: new Date().toISOString() }
  const list = commentsByFeedbackId[feedbackId] ? [...commentsByFeedbackId[feedbackId]] : []
  list.push(comment)
  commentsByFeedbackId[feedbackId] = list
  return comment
}

// Helper function to get all available tags
// This allows the frontend to display all possible tag options
function getAvailableTags() {
  return AVAILABLE_TAGS
}

// Updates the tags for a specific feedback item
// Note that this function validates tags against the available tags list
// to ensure data consistency across the application
function updateFeedbackTags(id, tags) {
  const index = feedback.findIndex((f) => f.id === id)
  if (index === -1) throw new Error('Feedback not found')

  // Let's make sure we only accept valid tags from our predefined list
  // This prevents users from creating arbitrary tags that don't fit our taxonomy
  const validatedTags = tags.filter((tag) => AVAILABLE_TAGS.includes(tag))

  // Create the updated feedback item with the new tags
  const updated = { ...feedback[index], tags: validatedTags }

  // Persist the changes to our in-memory data store
  feedback[index] = updated

  // Return the updated item so the client can update their UI
  return updated
}

export {
  getFeedback,
  getFeedbackById,
  updateFeedbackStatus,
  getComments,
  addComment,
  getAvailableTags,
  updateFeedbackTags,
}
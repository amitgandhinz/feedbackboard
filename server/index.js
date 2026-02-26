import express from 'express'
import cors from 'cors'
import {
  getFeedback,
  getFeedbackById,
  updateFeedbackStatus,
  getComments,
  addComment,
} from './store.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/feedback', (req, res) => {
  const list = getFeedback()
  res.json(list)
})

app.get('/api/feedback/:id', (req, res) => {
  const item = getFeedbackById(req.params.id)
  res.json(item)
})

app.patch('/api/feedback/:id', (req, res) => {
  const { status } = req.body
  if (!status) {
    return res.status(400).json({ error: 'status is required' })
  }
  const updated = updateFeedbackStatus(req.params.id, status)
  res.json(updated)
})

app.get('/api/feedback/:id/comments', (req, res) => {
  const comments = getComments(req.params.id)
  res.json(comments)
})

app.post('/api/feedback/:id/comments', (req, res) => {
  const { text } = req.body
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'text is required' })
  }
  const comment = addComment(req.params.id, text)
  res.status(201).json(comment)
})

app.listen(PORT, () => {
  console.log(`FeedbackBoard API at http://localhost:${PORT}`)
})

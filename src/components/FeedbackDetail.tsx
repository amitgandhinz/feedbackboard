import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { fetchFeedbackById, updateStatus } from '../api'
import type { Feedback } from '../types'
import { CommentSection } from './CommentSection'

interface FeedbackDetailProps {
  feedbackId: string
  onStatusUpdated: (id: string, status: 'Active' | 'Resolved') => void
  onClose: () => void
}

export function FeedbackDetail({ feedbackId, onStatusUpdated, onClose }: FeedbackDetailProps) {
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFeedbackById(feedbackId)
      .then(setFeedback)
      .catch((err) => {
        console.error('Failed to fetch feedback:', err)
        setError('Failed to load feedback details.')
      })
  }, [feedbackId])

  if (!feedback) return null

  const handleMarkResolved = async () => {
    try {
      const updated = await updateStatus(feedbackId, 'Resolved')
      setFeedback(updated)
      onStatusUpdated(feedbackId, 'Resolved')
      setError(null)
    } catch (err) {
      console.error('Failed to update status:', err)
      setError('Failed to mark as resolved. Please try again.')
    }
  }

  const handleReopen = async () => {
    try {
      const updated = await updateStatus(feedbackId, 'Active')
      setFeedback(updated)
      onStatusUpdated(feedbackId, 'Active')
      setError(null)
    } catch (err) {
      console.error('Failed to update status:', err)
      setError('Failed to reopen. Please try again.')
    }
  }

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 2 }}>
      {error && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            backgroundColor: 'error.light',
            color: 'error.contrastText',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography variant="h6">{feedback.title}</Typography>
        <Chip label={feedback.status} color={feedback.status === 'Resolved' ? 'success' : 'default'} />
      </Box>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {feedback.description}
      </Typography>
      <Box sx={{ mb: 2 }}>
        {feedback.status === 'Active' ? (
          <Button variant="contained" size="small" onClick={handleMarkResolved}>
            Mark resolved
          </Button>
        ) : (
          <Button variant="outlined" size="small" onClick={handleReopen}>
            Reopen
          </Button>
        )}
        <Button size="small" onClick={onClose} sx={{ ml: 1 }}>
          Close
        </Button>
      </Box>
      <CommentSection feedbackId={feedbackId} />
    </Box>
  )
}

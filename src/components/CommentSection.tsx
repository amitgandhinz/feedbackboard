import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { fetchComments, addComment } from '../api'
import type { Comment } from '../types'

interface CommentSectionProps {
  feedbackId: string
}

export function CommentSection({ feedbackId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    fetchComments(feedbackId).then((data) => setComments(data))
  }, [feedbackId])

  const handleSubmit = () => {
    if (!newComment.trim()) return
    addComment(feedbackId, newComment).then((comment) => {
      setComments((prev) => [...prev, comment])
      setNewComment('')
    })
  }

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Comments
      </Typography>
      <List dense disablePadding sx={{ marginTop: 1, marginBottom: 2 }}>
        {comments.map((c) => (
          <ListItem
            key={c.id}
            disablePadding
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderBottom: '1px solid',
              borderColor: 'divider',
              py: 1.5,
            }}
          >
            <Box component="span" sx={{ fontSize: '0.875rem' }} dangerouslySetInnerHTML={{ __html: c.text }} />
            <Typography variant="caption" color="text.secondary">
              {new Date(c.createdAt).toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <TextField
          size="small"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          multiline
          minRows={2}
          fullWidth
        />
        <Button variant="contained" onClick={handleSubmit} disabled={!newComment.trim()}>
          Add
        </Button>
      </Box>
    </Box>
  )
}

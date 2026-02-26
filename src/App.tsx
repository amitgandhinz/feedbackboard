import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import { fetchFeedback } from './api'
import type { Feedback } from './types'
import { FeedbackBoard } from './components/FeedbackBoard'
import { FeedbackDetail } from './components/FeedbackDetail'

export default function App() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchFeedback().then(setFeedback)
  }, [])

  const handleStatusUpdated = (id: string, status: 'Active' | 'Resolved') => {
    setFeedback((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    )
    if (selectedId === id) {
      setFeedback((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status } : f))
      )
    }
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          py: 2,
          px: 0,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            FeedbackBoard
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Internal customer feedback tool
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <FeedbackBoard
          feedback={feedback}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onStatusUpdated={handleStatusUpdated}
        />
      </Container>
      <Drawer
        anchor="right"
        open={selectedId !== null}
        onClose={() => setSelectedId(null)}
        ModalProps={{
          BackdropProps: { sx: { backgroundColor: 'rgba(19, 21, 23, 0.2)' } },
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 420 },
            maxWidth: '100%',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: 1,
              py: 0.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <IconButton aria-label="Close drawer" onClick={() => setSelectedId(null)} size="small" sx={{ fontSize: '1.25rem' }}>
              ×
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
            {selectedId && (
              <FeedbackDetail
                feedbackId={selectedId}
                onStatusUpdated={handleStatusUpdated}
                onClose={() => setSelectedId(null)}
              />
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

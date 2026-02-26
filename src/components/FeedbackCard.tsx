import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import type { Feedback } from '../types'

interface FeedbackCardProps {
  item: Feedback
  selected: boolean
  onSelect: () => void
  onMarkResolved: () => void
  onReopen: () => void
}

export function FeedbackCard({
  item,
  selected,
  onSelect,
  onMarkResolved,
  onReopen,
}: FeedbackCardProps) {
  return (
    <ListItemButton
      selected={selected}
      onClick={onSelect}
      sx={{ alignItems: 'flex-start', flexDirection: 'column', border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}
    >
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
        <ListItemText primary={item.title} secondary={item.description} primaryTypographyProps={{ fontWeight: 500 }} />
        <Chip label={item.status} size="small" color={item.status === 'Resolved' ? 'success' : 'default'} />
      </Box>
      <Box sx={{ mt: 1, alignSelf: 'flex-end' }}>
        {item.status === 'Active' ? (
          <Button size="small" variant="outlined" color="primary" onClick={(e) => { e.stopPropagation(); onMarkResolved() }}>
            Mark resolved
          </Button>
        ) : (
          <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); onReopen() }}>
            Reopen
          </Button>
        )}
      </Box>
    </ListItemButton>
  )
}

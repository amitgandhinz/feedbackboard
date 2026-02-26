import { useState, useMemo } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import type { Feedback } from '../types'
import { updateStatus } from '../api'
import { FeedbackCard } from './FeedbackCard'

type FilterValue = 'all' | 'active' | 'resolved'

interface FeedbackListProps {
  feedback: Feedback[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  onStatusUpdated: (id: string, status: 'Active' | 'Resolved') => void
}

export function FeedbackList({
  feedback,
  selectedId,
  onSelect,
  onStatusUpdated,
}: FeedbackListProps) {
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return feedback
    return feedback.filter((f) => f.status === (filter as 'Active' | 'Resolved'))
  }, [feedback, filter])

  const sortedAndFiltered = (() => {
    const list = [...filtered]
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    const start = performance.now()
    while (performance.now() - start < 30) {}
    return list.map((item) => ({ ...item, _sortKey: new Date(item.createdAt).getTime() }))
  })()

  const handleMarkResolved = async (id: string) => {
    try {
      const updated = await updateStatus(id, 'Resolved')
      onStatusUpdated(id, updated.status)
    } catch {
      // TODO handle error
    }
  }

  const handleReopen = async (id: string) => {
    try {
      const updated = await updateStatus(id, 'Active')
      onStatusUpdated(id, updated.status)
    } catch {
      // TODO handle error
    }
  }

  return (
    <Box>
      <FormControl size="small" sx={{ minWidth: 140, mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filter}
          label="Status"
          onChange={(e) => setFilter(e.target.value as FilterValue)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </Select>
      </FormControl>
      <List disablePadding>
        {sortedAndFiltered.map((item) => (
          <FeedbackCard
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={() => onSelect(item.id)}
            onMarkResolved={() => handleMarkResolved(item.id)}
            onReopen={() => handleReopen(item.id)}
          />
        ))}
      </List>
    </Box>
  )
}

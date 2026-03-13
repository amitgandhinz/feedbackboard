import { useState, useMemo, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import type { Feedback, FeedbackTag } from '../types'
import { updateStatus, fetchAvailableTags } from '../api'
import { FeedbackCard } from './FeedbackCard'

type FilterValue = 'all' | 'Active' | 'Resolved'

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
  const [availableTags, setAvailableTags] = useState<FeedbackTag[]>([])
  const [selectedTagFilters, setSelectedTagFilters] = useState<FeedbackTag[]>([])

  // Let's fetch the available tags when the component mounts
  // This allows us to show all possible tag filters to the user
  useEffect(() => {
    fetchAvailableTags()
      .then((tags) => setAvailableTags(tags))
      .catch((err) => console.error('Failed to fetch tags:', err))
  }, [])

  const filtered = useMemo(() => {
    let result = feedback

    // First, let's filter by status
    if (filter !== 'all') {
      result = result.filter((f) => f.status === (filter as 'Active' | 'Resolved'))
    }

    // Then, let's filter by tags if any tags are selected
    // We use OR logic here - feedback matches if it has ANY of the selected tags
    if (selectedTagFilters.length > 0) {
      result = result.filter((f) => {
        // Check if the feedback has at least one of the selected tags
        return selectedTagFilters.some((selectedTag) => f.tags?.includes(selectedTag))
      })
    }

    return result
  }, [feedback, filter, selectedTagFilters])

  const sortedAndFiltered = useMemo(() => {
    const list = [...filtered]
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return list
  }, [filtered])

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

  // Handler for toggling tag filters
  // Let's allow users to select multiple tags to filter by
  const handleToggleTagFilter = (tag: FeedbackTag) => {
    setSelectedTagFilters((prev) => {
      // If the tag is already selected, remove it
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag)
      }
      // Otherwise, add it to the selected tags
      return [...prev, tag]
    })
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            label="Status"
            onChange={(e) => setFilter(e.target.value as FilterValue)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Let's add tag filters so users can filter feedback by tags */}
      {/* This makes it easier to find specific types of feedback */}
      {availableTags.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {availableTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => handleToggleTagFilter(tag)}
                color={selectedTagFilters.includes(tag) ? 'primary' : 'default'}
                variant={selectedTagFilters.includes(tag) ? 'filled' : 'outlined'}
                size="small"
              />
            ))}
          </Box>
        </Box>
      )}
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

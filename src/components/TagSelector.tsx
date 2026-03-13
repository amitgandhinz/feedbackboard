import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import { fetchAvailableTags } from '../api'
import type { FeedbackTag } from '../types'

// This interface defines the props that the TagSelector component accepts
// We use TypeScript interfaces to ensure type safety across our application
interface TagSelectorProps {
  selectedTags: FeedbackTag[]
  onTagsChange: (tags: FeedbackTag[]) => void
  disabled?: boolean
}

// Helper function to get the appropriate color for each tag type
// This improves the visual hierarchy and makes it easier to scan feedback
// Note that we use a switch statement here for better performance
// compared to object lookups
const getTagColorForDisplay = (tag: FeedbackTag): 'error' | 'warning' | 'info' | 'success' | 'default' => {
  switch (tag) {
    case 'Bug':
      return 'error'
    case 'Feature Request':
      return 'info'
    case 'UI/UX':
      return 'warning'
    case 'Performance':
      return 'warning'
    case 'Security':
      return 'error'
    case 'Documentation':
      return 'default'
    default:
      return 'default'
  }
}

// Let's create a custom hook to manage the available tags
// This encapsulates the fetching logic and makes it reusable
function useAvailableTags() {
  const [availableTagsFromServer, setAvailableTagsFromServer] = useState<FeedbackTag[]>([])
  const [isLoadingTagsFromServer, setIsLoadingTagsFromServer] = useState(true)

  useEffect(() => {
    // Let's fetch the available tags when the component mounts
    // This ensures we always have the latest list from the backend
    const fetchTagsFromServerAsync = async () => {
      try {
        const tagsDataFromServer = await fetchAvailableTags()
        setAvailableTagsFromServer(tagsDataFromServer)
      } catch (error) {
        console.error('Failed to fetch available tags:', error)
        // If fetching fails, we'll just use an empty array
        // This prevents the UI from breaking if the backend is down
        setAvailableTagsFromServer([])
      } finally {
        setIsLoadingTagsFromServer(false)
      }
    }

    fetchTagsFromServerAsync()
  }, [])

  return { availableTagsFromServer, isLoadingTagsFromServer }
}

// Main component for selecting tags
// This component provides a multi-select dropdown for tags
// and displays selected tags as chips below the dropdown
export function TagSelector({ selectedTags, onTagsChange, disabled = false }: TagSelectorProps) {
  const { availableTagsFromServer, isLoadingTagsFromServer } = useAvailableTags()

  // Handler for when the user changes the selected tags in the dropdown
  // Note that we need to handle the event type carefully here
  const handleChangeTagsSelection = (event: any) => {
    const {
      target: { value },
    } = event

    // Let's handle both string and array values
    // The MUI Select component can return either type depending on configuration
    const newlySelectedTags = typeof value === 'string' ? value.split(',') : value

    // Call the parent component's callback with the new tags
    onTagsChange(newlySelectedTags as FeedbackTag[])
  }

  // Handler for removing a tag when user clicks the X on a chip
  // This provides an alternative way to deselect tags besides using the dropdown
  const handleRemoveTagFromSelection = (tagToRemove: FeedbackTag) => {
    const updatedTagsList = selectedTags.filter((tag) => tag !== tagToRemove)
    onTagsChange(updatedTagsList)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth size="small" disabled={disabled || isLoadingTagsFromServer}>
        <InputLabel id="tag-selector-label">Tags</InputLabel>
        <Select
          labelId="tag-selector-label"
          id="tag-selector"
          multiple
          value={selectedTags}
          onChange={handleChangeTagsSelection}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} size="small" />
              ))}
            </Box>
          )}
        >
          {availableTagsFromServer.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Let's display the selected tags as chips below the dropdown */}
      {/* This provides a clear visual representation of what's selected */}
      {selectedTags.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
          {selectedTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              color={getTagColorForDisplay(tag)}
              onDelete={disabled ? undefined : () => handleRemoveTagFromSelection(tag)}
              size="small"
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

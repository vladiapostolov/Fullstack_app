import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import NoteForm from './NoteForm'
import noteServices from '../services/noteServices'

vi.mock('../services/noteServices')

describe('<NoteForm />', () => {
  let user
  let setNotes

  beforeEach(() => {
    user = userEvent.setup()
    setNotes = vi.fn()
    render(<NoteForm notes={[]} setNotes={setNotes} />)
  })

  test('shows the note form after clicking "Add new note"', async () => {
    await user.click(screen.getByText('Add new note'))

    expect(screen.getByLabelText('Content:')).toBeDefined()
    expect(screen.getByText('Save')).toBeDefined()
  })

  test('updates the content field as the user types', async () => {
    await user.click(screen.getByText('Add new note'))
    const input = screen.getByLabelText('Content:')
    await user.type(input, 'testing NoteForm')

    expect(input.value).toBe('testing NoteForm')
  })

  test('calls setNotes with the new note after a successful submit', async () => {
    const savedNote = { id: '1', content: 'testing NoteForm', important: true }
    noteServices.sendUserNote.mockResolvedValue(savedNote)

    await user.click(screen.getByText('Add new note'))
    await user.type(screen.getByLabelText('Content:'), 'testing NoteForm')
    await user.click(screen.getByText('Save'))

    expect(noteServices.sendUserNote).toHaveBeenCalledWith({
      content: 'testing NoteForm',
      important: true
    })

    await waitFor(() => {
      expect(setNotes).toHaveBeenCalledWith([savedNote])
    })
  })
})


        // <input
        //   value={newNote}
        //   onChange={event => setNewNote(event.target.value)}
        //   placeholder='write note content here'. -->> add placeholder to the 
        // input field
        //screen.getByPlaceholderText('write note content here')
        //or by id :)
        //npm test -- --coverage

const { useNavigate, useParams, useOutletContext } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteEdit() {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const [showPalette, setShowPalette] = useState(false)
  const { noteId } = useParams()
  const navigate = useNavigate()
  const { onUpdateNote } = useOutletContext()

  const colors = ['#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9']

  useEffect(() => {
    if (noteId) loadNote()
  }, [])

  function loadNote() {
    noteService
      .get(noteId)
      .then(setNoteToEdit)
      .catch((err) => {
        console.log('Error loading note:', err)
        showErrorMsg('Failed to load note')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }

    if (field === 'backgroundColor') {
      setNoteToEdit((prevNote) => ({ ...prevNote, style: { ...prevNote.style, [field]: value } }))
    } else if (['txt', 'title', 'url', 'todos'].includes(field)) {
      setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    } else {
      setNoteToEdit((prevNote) => ({ ...prevNote, [field]: value }))
    }
  }

  function handleColorChange(color) {
    setNoteToEdit((prevNote) => ({
      ...prevNote,
      style: { ...prevNote.style, backgroundColor: color },
    }))
    setShowPalette(false)
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    let noteToSave = { ...noteToEdit }

    if (noteToSave.type === 'NoteTodos') {
      const todos = noteToSave.info.todos.split(',').map((todo) => ({
        txt: todo.trim(),
        isDone: false,
      }))
      noteToSave.info.todos = todos
      delete noteToSave.info.txt
    }

    noteService
      .save(noteToSave)
      .then((savedNote) => {
        onUpdateNote(savedNote)
        navigate('/note')
        showSuccessMsg(`Note Saved (id: ${savedNote.id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot save note')
        console.log('Error saving note:', err)
      })
  }

  function handleTypeChange(newType) {
    setNoteToEdit((prevNote) => ({ ...prevNote, type: newType }))
  }

  function togglePin() {
    setNoteToEdit((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))
  }

  function onBack() {
    navigate('/note')
  }

  return (
    <React.Fragment>
      <div className='back-drop' onClick={onBack}></div>
      <div className='note-edit' style={{ backgroundColor: noteToEdit.style.backgroundColor }}>
        <h3>{noteId ? 'Edit' : 'Add'} Note</h3>
        <form onSubmit={onSaveNote}>
          <input
            type='text'
            placeholder='Title'
            name='title'
            value={noteToEdit.info.title || ''}
            onChange={handleChange}
          />

          <textarea
            placeholder={
              noteToEdit.type === 'NoteTxt'
                ? 'Take a note...'
                : noteToEdit.type === 'NoteTodos'
                ? 'Enter tasks separated by commas...'
                : 'Enter url...'
            }
            name={noteToEdit.type === 'NoteImg' ? 'url' : noteToEdit.type === 'NoteTodos' ? 'todos' : 'txt'}
            value={
              noteToEdit.type === 'NoteImg'
                ? noteToEdit.info.url
                : noteToEdit.type === 'NoteTodos'
                ? noteToEdit.info.todos
                : noteToEdit.info.txt
            }
            onChange={handleChange}
          />

          <div className='note-edit-actions'>
            <div className='note-type-buttons'>
              <button type='button' onClick={() => handleTypeChange('NoteTxt')}>
                <span className='material-symbols-outlined'>title</span>
              </button>
              <button type='button' onClick={() => handleTypeChange('NoteImg')}>
                <span className='material-symbols-outlined'>image</span>
              </button>
              <button type='button' onClick={() => handleTypeChange('NoteVideo')}>
                <span className='material-symbols-outlined'>movie</span>
              </button>
              <button type='button' onClick={() => handleTypeChange('NoteTodos')}>
                <span className='material-symbols-outlined'>list</span>
              </button>
              <div className='edit-color-picker-container'>
                <button type='button' onClick={() => setShowPalette(!showPalette)} className='edit-color-picker-button'>
                  <span className='material-symbols-outlined'>palette</span>
                </button>
                {showPalette && (
                  <div className='edit-color-palette'>
                    {colors.map((color) => (
                      <button
                        key={color}
                        className='edit-color-option'
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorChange(color)}
                        type='button'
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button type='submit' className='save-button'>
              Save
            </button>
          </div>
          <button type='button' className={`pin-button ${noteToEdit.isPinned ? 'pinned' : ''}`} onClick={togglePin}>
            <span className='material-symbols-outlined'>{noteToEdit.isPinned ? 'keep' : 'keep_off'}</span>
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

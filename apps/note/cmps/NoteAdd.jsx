const { useNavigate, useParams, useLocation } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteAdd({ loadNotes }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const location = useLocation()

  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(location.search)
    const title = searchParams.get('title')
    const text = searchParams.get('text')

    // Update noteToAdd if URL parameters are present
    if (title || text) {
      setNoteToAdd((prevNote) => ({
        ...prevNote,
        info: {
          ...prevNote.info,
          title: title || prevNote.info.title,
          txt: text || prevNote.info.txt,
        },
      }))
    }
  }, [location])

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
      setNoteToAdd((prevNote) => ({ ...prevNote, style: { ...prevNote.style, [field]: value } }))
    } else if (['txt', 'title', 'url', 'todos'].includes(field)) {
      setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    } else {
      setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
    }
  }
  function onSaveNote(ev) {
    console.log(noteToAdd)
    let noteToSave = { ...noteToAdd }
    ev.preventDefault()
    if (noteToSave.type === 'NoteTodos') {
      const todos = noteToSave.info.todos.split(',').map((todo) => ({
        txt: todo.trim(),
        isDone: false,
      }))
      noteToAdd.info.todos = todos
      delete noteToAdd.info.txt
    }
    noteService
      .save(noteToAdd)
      .then((savedNote) => {
        showSuccessMsg(`Note Saved (id: ${savedNote.id})`)
        loadNotes()
      })
      .catch((err) => {
        showErrorMsg('Cannot save note')
        console.log('err:', err)
      })
  }
  function handleTypeChange(newType) {
    setNoteToAdd((prevNote) => ({ ...prevNote, type: newType }))
  }

  function togglePin() {
    setNoteToAdd((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))
  }

  return (
    <section className='note-add'>
      <form onSubmit={onSaveNote}>
        <div className='note-add-content'>
          <input type='text' placeholder='Title' name='title' value={noteToAdd.info.title} onChange={handleChange} />
          <input
            type='text'
            placeholder={
              noteToAdd.type === 'NoteTxt'
                ? 'Take a note...'
                : noteToAdd.type === 'NoteTodos'
                ? 'Enter tasks separated by commas...'
                : 'Enter url...'
            }
            name={noteToAdd.type === 'NoteImg' ? 'url' : noteToAdd.type === 'NoteTodos' ? 'todos' : 'txt'}
            value={
              noteToAdd.type === 'NoteImg'
                ? noteToAdd.info.url
                : noteToAdd.type === 'NoteTodos'
                ? noteToAdd.info.todos
                : noteToAdd.info.txt
            }
            onChange={handleChange}
          />
        </div>
        <div className='note-add-actions'>
          <div className='note-type-buttons'>
            <button type='button' onClick={() => handleTypeChange('NoteTxt')}>
              <img src='assets/img/text.svg' alt='text' />
            </button>
            <button type='button' onClick={() => handleTypeChange('NoteImg')}>
              <img src='assets/img/image.svg' alt='video' />
            </button>
            <button type='button' onClick={() => handleTypeChange('NoteVideo')}>
              <img src='assets/img/movie.svg' alt='video' />
            </button>
            <button type='button' onClick={() => handleTypeChange('NoteTodos')}>
              todo
            </button>
          </div>
          <button type='submit' className='save-button'>
            Add
          </button>
        </div>
        <button type='button' className={`pin-button ${noteToAdd.isPinned ? 'pinned' : ''}`} onClick={togglePin}>
          {noteToAdd.isPinned ? (
            <img src='assets/img/pinned.svg' alt='pinned' />
          ) : (
            <img src='assets/img/notpinned.svg' alt='not pinned' />
          )}
        </button>
      </form>
    </section>
  )
}

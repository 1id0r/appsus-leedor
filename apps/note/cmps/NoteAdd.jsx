const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteAdd({ loadNotes }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const navigate = useNavigate()

  useEffect(() => {
    loadNotes()
  }, [noteToAdd])

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
    } else if (['txt', 'title', 'url'].includes(field)) {
      setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    } else {
      setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
    }
  }
  function onSaveNote(ev) {
    console.log(noteToAdd)
    ev.preventDefault()
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
            placeholder={noteToAdd.type === 'NoteTxt' ? 'Take a note...' : 'Enter url...'}
            name={noteToAdd.type === 'NoteImg' ? 'url' : 'txt'}
            value={noteToAdd.type === 'NoteImg' ? noteToAdd.info.url : noteToAdd.info.txt}
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

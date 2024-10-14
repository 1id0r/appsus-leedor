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
  function renderInputField() {
    switch (noteToAdd.type) {
      case 'NoteImg':
        return (
          <input
            type='text'
            placeholder='Enter image URL...'
            name='url'
            value={noteToAdd.info.url || ''}
            onChange={handleChange}
          />
        )
      case 'NoteVideo':
        return (
          <input
            type='text'
            placeholder='Enter video URL...'
            name='url'
            value={noteToAdd.info.url || ''}
            onChange={handleChange}
          />
        )
      case 'NoteAudio':
        return (
          <input
            type='text'
            placeholder='Enter audio URL...'
            name='url'
            value={noteToAdd.info.url || ''}
            onChange={handleChange}
          />
        )
      default:
        return (
          <input
            type='text'
            placeholder='Enter text...'
            name='txt'
            value={noteToAdd.info.txt || ''}
            onChange={handleChange}
          />
        )
    }
  }

  return (
    <section className='note-add'>
      <form onSubmit={onSaveNote}>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={noteToAdd.info.title || ''}
          onChange={handleChange}
        />
        {renderInputField()}
        <div className='note-type-buttons'>
          <button type='button' onClick={() => handleTypeChange('NoteTxt')}>
            A
          </button>
          <button type='button' onClick={() => handleTypeChange('NoteImg')}>
            🖼️
          </button>
          <button type='button' onClick={() => handleTypeChange('NoteVideo')}>
            🎥
          </button>
          <button type='button' onClick={() => handleTypeChange('NoteAudio')}>
            🔊
          </button>

          <button onClick={onSaveNote}>Save</button>
        </div>
      </form>
    </section>
  )
}

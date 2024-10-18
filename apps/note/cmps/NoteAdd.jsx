const { useLocation } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteAdd({ loadNotes }) {
  const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
  const [showPalette, setShowPalette] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const location = useLocation()
  const colors = ['#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9']

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const title = searchParams.get('title')
    const text = searchParams.get('text')

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

  function handleColorChange(color) {
    setNoteToAdd((prevNote) => ({
      ...prevNote,
      style: { ...prevNote.style, backgroundColor: color },
    }))
    setShowPalette(false)
  }

  function onSaveNote(ev) {
    ev.preventDefault()
    let noteToSave = { ...noteToAdd }

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
        setNoteToAdd(noteService.getEmptyNote())
        setIsExpanded(false)
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

  function handleExpand() {
    setIsExpanded(true)
  }

  return (
    <section className='note-add' style={{ backgroundColor: noteToAdd.style.backgroundColor }}>
      <form onSubmit={onSaveNote} onClick={handleExpand} className={`note-form ${isExpanded ? 'expanded' : ''}`}>
        <input type='text' placeholder='Title' name='title' value={noteToAdd.info.title} onChange={handleChange} />

        {isExpanded && (
          <div>
            <textarea
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

            <div className='note-add-actions'>
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
                <div className='add-color-picker-container'>
                  <button
                    type='button'
                    onClick={() => setShowPalette(!showPalette)}
                    className='add-color-picker-button'
                  >
                    <span className='material-symbols-outlined'>palette</span>
                  </button>
                  {showPalette && (
                    <div className='add-color-palette'>
                      {colors.map((color) => (
                        <button
                          key={color}
                          className='add-color-option'
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
                Add
              </button>
            </div>
            <button type='button' className={`pin-button ${noteToAdd.isPinned ? 'pinned' : ''}`} onClick={togglePin}>
              <span className='material-symbols-outlined'>{noteToAdd.isPinned ? 'keep' : 'keep_off'}</span>
            </button>
          </div>
        )}
      </form>
    </section>
  )
}

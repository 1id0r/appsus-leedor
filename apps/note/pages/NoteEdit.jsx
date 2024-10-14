const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function NoteEdit() {
  const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
  const { noteId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (noteId) loadNote()
    console.log(noteToEdit)
  }, [])

  function loadNote() {
    noteService
      .get(noteId)
      .then(setNoteToEdit)
      .catch((err) => console.log(err, 'err'))
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
      setNoteToEdit((prevNoteToEdit) => ({ ...prevNoteToEdit, style: { ...prevNoteToEdit.style, [field]: value } }))
    } else if (field === 'txt' || field === 'title') {
      setNoteToEdit((prevNoteToEdit) => ({ ...prevNoteToEdit, info: { ...prevNoteToEdit.info, [field]: value } }))
    } else {
      setNoteToEdit((prevNoteToEdit) => ({ ...prevNoteToEdit, [field]: value }))
    }
  }
  function onSaveNote(ev) {
    console.log(noteToEdit)
    ev.preventDefault()
    noteService
      .save(noteToEdit)
      .then((savedNote) => {
        navigate('/note')
        showSuccessMsg(`Note Saved (id: ${savedNote.id})`)
      })
      .catch((err) => {
        showErrorMsg('Cannot save note')
        console.log('err:', err)
      })
  }

  return (
    <section className='note-edit'>
      <h3>{noteId ? 'Edit' : 'Add'} Note</h3>
      <form onSubmit={onSaveNote}>
        <label htmlFor='title'>title:</label>
        <input type='text' name='title' value={noteToEdit.info.title || ''} onChange={handleChange} />
        <label htmlFor='text'>text:</label>
        <input type='text' name='txt' value={noteToEdit.info.txt || ''} onChange={handleChange} />

        <button>Save</button>
      </form>
    </section>
  )
}

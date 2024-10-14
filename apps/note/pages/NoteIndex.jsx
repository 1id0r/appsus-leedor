const { useState, useEffect } = React

import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
export function NoteIndex() {
  const [notes, setNotes] = useState()

  useEffect(() => {
    loadNotes()
    console.log(notes)
  }, [])

  function loadNotes() {
    noteService.query().then(setNotes)
  }
  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((notes) => notes.filter((note) => note.id !== noteId))
        // showSuccessMsg('Book removed successfully')
      })
      .catch((err) => {
        console.log('Problems removing book:', err)
        // showErrorMsg(`Problems removing book (${noteId})`)
      })
  }
  if (!notes) return <div>Loading</div>
  return (
    <React.Fragment>
      <h2> note app</h2>
      <NoteList onRemoveNote={onRemoveNote} notes={notes} />
    </React.Fragment>
  )
}

const { useState, useEffect } = React

import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { noteService } from '../services/note.service.js'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
export function NoteIndex() {
  const [notes, setNotes] = useState()
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

  useEffect(() => {
    loadNotes()
    console.log(notes)
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then(setNotes)
  }
  function onRemoveNote(noteId) {
    noteService
      .remove(noteId)
      .then(() => {
        setNotes((notes) => notes.filter((note) => note.id !== noteId))
        showSuccessMsg('note removed successfully')
        console.log(`Note removed (${noteId})`)
      })
      .catch((err) => {
        console.log('Problems removing note:', err)
        showErrorMsg(`Problems removing note (${noteId})`)
      })
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((filterBy) => ({ ...filterBy, ...filterByToEdit }))
  }

  if (!notes) return <div>Loading</div>
  return (
    <React.Fragment>
      <NoteFilter filterBy={filterBy} onSetFilter={onSetFilter} />
      <NoteAdd loadNotes={loadNotes} />
      <NoteList onRemoveNote={onRemoveNote} notes={notes} />
    </React.Fragment>
  )
}

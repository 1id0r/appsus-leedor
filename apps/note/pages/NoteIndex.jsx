const { useState, useEffect } = React
const { Outlet, useNavigate } = ReactRouterDOM
import { Moon, Sun } from 'lucide-react'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { noteService } from '../services/note.service.js'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
export function NoteIndex() {
  const [notes, setNotes] = useState()
  const [darkMode, setDarkMode] = useState(false)
  const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
  const navigate = useNavigate()

  useEffect(() => {
    loadNotes()
    console.log(notes)
  }, [filterBy])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode)
  }

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
  function onTogglePin(noteId) {
    noteService.togglePin(noteId).then(() => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned } : note))
      )
    })
  }
  function onDuplicateNote(noteId) {
    noteService
      .duplicate(noteId)
      .then((duplicatedNote) => {
        setNotes((prevNotes) => [...prevNotes, duplicatedNote])
        showSuccessMsg('Note duplicated successfully')
      })
      .catch((err) => {
        console.log('Problems duplicating note:', err)
        showErrorMsg(`Problems duplicating note (${noteId})`)
      })
  }
  function onToggleTodo(noteId, todoIndex) {
    noteService
      .toggleTodo(noteId, todoIndex)
      .then((updatedNote) => {
        setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
      })
      .catch((err) => {
        console.log('Problems toggling todo:', err)
        showErrorMsg(`Problems toggling todo`)
      })
  }
  function onUpdateNoteColor(noteId, color) {
    noteService
      .get(noteId)
      .then((note) => {
        note.style.backgroundColor = color
        return noteService.save(note)
      })
      .then(() => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
          )
        )
      })
  }
  function onSendAsMail(noteId) {
    console.log(noteId)
    noteService
      .get(noteId)
      .then((note) => {
        if (note) {
          const subject = encodeURIComponent(note.info.title)
          console.log(subject)
          const body = encodeURIComponent(note.info.txt)
          console.log(body)
          navigate(`/mail/compose?subject=${subject}&body=${body}`)
        } else {
          console.error('Note not found')
        }
      })
      .catch((err) => {
        console.error('Error fetching note:', err)
      })
  }

  function onSetFilter(filterByToEdit) {
    setFilterBy((filterBy) => ({ ...filterBy, ...filterByToEdit }))
  }
  function onUpdateNote(updatedNote) {
    setNotes((prevNotes) => prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  if (!notes) return <div>Loading</div>
  return (
    <div className={darkMode ? 'dark' : ''}>
      <button onClick={toggleDarkMode} className={`dark-btn`}>
        {darkMode ? (
          <img src='./assets/img/lightmode.svg' alt='Books' />
        ) : (
          <img src='./assets/img/darkmode.svg' alt='Books' />
        )}
      </button>
      <div className='filter-container'>
        <NoteFilter onToggleTodo={onToggleTodo} filterBy={filterBy} onSetFilter={onSetFilter} />
      </div>
      <Outlet context={{ onUpdateNote }} />
      <NoteAdd loadNotes={loadNotes} />
      <NoteList
        onUpdateNoteColor={onUpdateNoteColor}
        onSendAsMail={onSendAsMail}
        onDuplicateNote={onDuplicateNote}
        onTogglePin={onTogglePin}
        onToggleTodo={onToggleTodo}
        onRemoveNote={onRemoveNote}
        notes={notes}
      />
    </div>
  )
}

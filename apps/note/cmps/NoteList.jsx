const { Link } = ReactRouterDOM

import { NotePreview } from './NotePreview.jsx'

// return <NotePreview />
export function NoteList({ notes, onRemoveNote, onTogglePin }) {
  //   console.log(notes)
  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)

  const renderNoteItem = (note) => (
    <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
      <NotePreview note={note} />
      <section className='note-actions'>
        <button onClick={() => onRemoveNote(note.id)}>Remove</button>
        <button onClick={() => onTogglePin(note.id)}>{note.isPinned ? 'Unpin' : 'Pin'}</button>
        <Link to={`/note/edit/${note.id}`}>
          <button>Edit</button>
        </Link>
      </section>
    </li>
  )

  return (
    <div className='note-list-container'>
      {pinnedNotes.length > 0 && (
        <div className='pinned-notes'>
          <h2>Pinned</h2>
          <ul className='note-list'>{pinnedNotes.map(renderNoteItem)}</ul>
        </div>
      )}
      <div className='unpinned-notes'>
        <h2>Other</h2>
        <ul className='note-list'>{unpinnedNotes.map(renderNoteItem)}</ul>
      </div>
    </div>
  )
}

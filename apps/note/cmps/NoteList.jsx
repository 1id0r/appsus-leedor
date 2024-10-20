const { Link } = ReactRouterDOM

import { NotePreview } from './NotePreview.jsx'

export function NoteList({
  notes,
  onRemoveNote,
  onTogglePin,
  onDuplicateNote,
  onToggleTodo,
  onSendAsMail,
  onUpdateNoteColor,
}) {
  const pinnedNotes = notes.filter((note) => note.isPinned)
  const unpinnedNotes = notes.filter((note) => !note.isPinned)

  const renderNoteItem = (note) => (
    <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
      <NotePreview onUpdateNoteColor={onUpdateNoteColor} onToggleTodo={onToggleTodo} note={note} />
      <section className='note-actions'>
        <button onClick={() => onRemoveNote(note.id)}>
          {' '}
          <span class='material-symbols-outlined'>delete</span>
        </button>
        <Link to={`/note/edit/${note.id}`}>
          <button>
            <span class='material-symbols-outlined'>edit</span>
          </button>
        </Link>
        <button onClick={() => onDuplicateNote(note.id)}>
          {' '}
          <span class='material-symbols-outlined'>content_copy</span>
        </button>
        <button onClick={() => onSendAsMail(note.id)}>
          <span class='material-symbols-outlined'>ios_share</span>
        </button>
      </section>
      <button className='pin-btn' onClick={() => onTogglePin(note.id)}>
        {note.isPinned ? (
          <span class='material-symbols-outlined'>keep</span>
        ) : (
          <span class='material-symbols-outlined'>keep_off</span>
        )}
      </button>
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

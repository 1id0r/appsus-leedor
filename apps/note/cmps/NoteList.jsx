const { Link } = ReactRouterDOM

import { NotePreview } from './NotePreview.jsx'

// return <NotePreview />
export function NoteList({ notes, onRemoveNote }) {
  //   console.log(notes)
  return (
    // <h2>hello</h2>
    <ul className='note-list'>
      {notes.map((note) => (
        <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
          <NotePreview note={note} />
          <section>
            <button onClick={() => onRemoveNote(note.id)}>Remove</button>
            <button>
              <Link to={`/note/edit/${note.id}`}>Edit</Link>
            </button>
          </section>
        </li>
      ))}
    </ul>
  )
}

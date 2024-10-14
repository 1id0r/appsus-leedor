import { NotePreview } from './NotePreview.jsx'

// return <NotePreview />
export function NoteList({ notes, onRemoveNote }) {
  console.log(notes)
  return (
    // <h2>hello</h2>
    <ul className='note-list'>
      {notes.map((note) => (
        <li key={note.id}>
          <NotePreview note={note} />
        </li>
      ))}
    </ul>
  )
}

export function NotePreview({ note, onToggleTodo }) {
  function renderNoteContent() {
    switch (note.type) {
      case 'NoteTxt':
        return <p className='note-text'>{note.info.txt}</p>
      case 'NoteImg':
        return <img src={note.info.url} alt={note.info.title} />
      case 'NoteVideo':
        return (
          <video controls>
            <source src={note.info.url} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )
      case 'NoteAudio':
        return (
          <audio controls>
            <source src={note.info.url} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        )
      case 'NoteTodos':
        return (
          <ul className='todo-list'>
            {note.info.todos.map((todo, index) => (
              <li key={index} className={todo.isDone ? 'done' : ''}>
                <input type='checkbox' checked={todo.isDone} onChange={() => onToggleTodo(note.id, index)} />
                <span>{todo.txt}</span>
              </li>
            ))}
          </ul>
        )
      default:
        return <p>Unsupported note type</p>
    }
  }

  return (
    <div className='note-preview'>
      <h2 className='note-title'>{note.info.title}</h2>
      <div className='note-content'>{renderNoteContent()}</div>
    </div>
  )
}

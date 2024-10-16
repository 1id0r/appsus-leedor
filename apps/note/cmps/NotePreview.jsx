const { useState } = React
export function NotePreview({ note, onToggleTodo, onUpdateNoteColor }) {
  const [showPalette, setShowPalette] = useState(true)

  const colors = ['#FF99C8', '#FCF6BD', '#D0F4DE', '#A9DEF9', '#E4C1F9']

  const handleColorChange = (color) => {
    onUpdateNoteColor(note.id, color)
    setShowPalette(false)
  }

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
    <div className='note-preview' style={{ backgroundColor: note.style.backgroundColor }}>
      <h2 className='note-title'>{note.info.title}</h2>
      <div className='note-content'>{renderNoteContent()}</div>
      <div className='note-pallette'>
        <button onClick={() => setShowPalette(!showPalette)}>palette</button>
        {showPalette && (
          <div className='color-palette'>
            {colors.map((color) => (
              <button
                key={color}
                className='color-option'
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
              />
            ))}
          </div>
        )}
        {/* ... (other action buttons) */}
      </div>
    </div>
  )
}

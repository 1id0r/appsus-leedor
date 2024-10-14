export function NotePreview({ note }) {
  function renderNoteContent() {
    switch (note.type) {
      case 'NoteTxt':
        return <p>{note.info.txt}</p>
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
      default:
        return <p>Unsupported note type</p>
    }
  }

  return (
    <div className='note-preview'>
      <h2>{note.info.title}</h2>
      {renderNoteContent()}
    </div>
  )
}

export function NotePreview({ note }) {
  return (
    <React.Fragment>
      <h2>{note.info.title}</h2>
      <h4>{note.info.txt}</h4>
    </React.Fragment>
  )
}

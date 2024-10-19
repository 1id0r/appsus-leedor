const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const field = target.name
    const type = target.type
    let value = target.value
    switch (type) {
      case 'number':
      case 'range':
        value = +value
        break
      case 'checkbox':
        value = target.checked
        break
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  const { title } = filterByToEdit

  return (
    <section className='note-filter'>
      <button>
        <span className='material-symbols-outlined'>search</span>
      </button>
      <input onChange={handleChange} placeholder='search' type='text' name='title' id='title' value={title}></input>
    </section>
  )
}

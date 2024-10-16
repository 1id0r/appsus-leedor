const { useState, useEffect , } = React

export function BookFilter({ filterBy, onSetFilter }) {

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
                break;
            case 'checkbox':
                value = target.checked
                break;
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { title, amount } = filterByToEdit

    return (
        <section className="book-filter">
            <h4>Filter:</h4>
            <form >
                <label htmlFor="title">Title</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                        placeholder="Search My Library">
                </input>
                <label htmlFor="price">Min Price</label>
                <input
                    onChange={handleChange}
                    type="number"
                    name="amount"
                    id="amount"
                    value={amount || ''}
                    min="1"
                    max="100000">
                </input>
            </form>
        </section>
    )
}
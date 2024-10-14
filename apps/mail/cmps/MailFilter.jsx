const { useState, useEffect } = React

export function MailFilter({filterBy, onSetFilter}) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    // useEffect(() => {
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        // value += ','
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = filterByToEdit


    return (
        <section className="mail-filter">
            <div>
                <button>🔍</button>
                <input 
                onChange={handleChange} 
                value={txt} 
                type="text" 
                name="txt" 
                placeholder="Search mail"/>
                <button>x</button>
                <button>⥹</button>
            </div>
        </section>
    )
}
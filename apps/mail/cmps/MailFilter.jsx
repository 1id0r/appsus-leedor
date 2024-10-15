const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

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

    function onSearch() {
        onSetFilter(filterByToEdit)
    }

    function onClearSearch() {
        onSetFilter()
        setFilterByToEdit(mailService.getDefaultFilter())
    }


    const { txt } = filterByToEdit


    return (
        <section className="mail-filter">
                <button onClick={onSearch}>
                    <span class="material-symbols-outlined">search</span>
                </button>
                <input
                    onChange={handleChange}
                    value={txt}
                    type="text"
                    name="txt"
                    placeholder="Search mail" />
                {txt ?
                    <button onClick={onClearSearch} className="filter-clear">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                    : ''}
                <button>
                    <span class="material-symbols-outlined">tune</span>
                </button>
        </section>
    )
}
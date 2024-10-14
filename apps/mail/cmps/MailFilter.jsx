const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter({filterBy, onSetFilter}) {

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

    function onSearch(){
        onSetFilter(filterByToEdit)
    }

    function onClearSearch(){
        onSetFilter()
        setFilterByToEdit(mailService.getDefaultFilter())
    }


    const { txt } = filterByToEdit


    return (
        <section className="mail-filter">
            <div>
                <button onClick={onSearch}>🔍</button>
                <input 
                onChange={handleChange} 
                value={txt} 
                type="text" 
                name="txt" 
                placeholder="Search mail"/>
                <button onClick={onClearSearch}>x</button>
                <button>⥹</button>
            </div>
        </section>
    )
}
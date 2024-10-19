const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isExtendedFilter, setIsExtendedFilter] = useState(false)

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
        if (target.value === '') {
            onClearSearch()
        }
    }

    function onSearch() {
        onSetFilter(filterByToEdit)
    }

    function onClearSearch() {
        console.log(filterByToEdit)
        onSetFilter()
        setFilterByToEdit(mailService.getDefaultFilter())
    }

    const { subjectTxt, bodyTxt, from, to, date } = filterByToEdit

    return (
        <React.Fragment>
            {isExtendedFilter ? <div className="filter-back-drop" onClick={() => setIsExtendedFilter(false)}></div> : ''}
            <section className="mail-filter">
                <button onClick={onSearch}><span className="material-symbols-outlined">search</span></button>
                <input
                    onChange={handleChange}
                    value={subjectTxt}
                    type="text"
                    name="subjectTxt"
                    placeholder="Search mail" />
                {subjectTxt ?
                    <button onClick={onClearSearch} className="filter-clear">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    : ''}
                <button onClick={() => setIsExtendedFilter(!isExtendedFilter)}><span className="material-symbols-outlined">tune</span></button>
                {isExtendedFilter ?
                    <div className="mail-filter-extended">
                        <label>From</label>
                        <input onChange={handleChange}
                            value={from}
                            type="text"
                            name="from" />
                        <label>To</label>
                        <input onChange={handleChange}
                            value={to}
                            type="text"
                            name="to" />
                        <label>Subject</label>
                        <input onChange={handleChange}
                            value={subjectTxt}
                            type="text"
                            name="subjectTxt" />
                        <label>Has the words</label>
                        <input onChange={handleChange}
                            value={bodyTxt}
                            type="text"
                            name="bodyTxt" />
                        <label>Date</label>
                        <input onChange={handleChange}
                            value={date}
                            type="date"
                            name="date" />
                        <div>
                            <button onClick={onClearSearch}>Clear filter</button>
                            <button onClick={onSearch}>Search</button>
                        </div>
                    </div>
                    : ''}
            </section >
        </React.Fragment>


    )
}

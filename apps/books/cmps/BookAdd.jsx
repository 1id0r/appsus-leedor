const { useState, useRef } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/books.service.js";
import { utilService } from '../../../services/util.service.js'


export function BookAdd({ addBook }) {

    const [matchBooks, setMatchBooks] = useState(null)
    const onSearchBooksDebounce = useRef(utilService.debounce(searchBooks, 1000)).current

    function searchBooks({ target }) {
        bookService.getGoogleBooks(target.value)
            .then(res => setMatchBooks(res.items))
    }

    function onAddGoogleBook(matchIdx) {
        const book = bookService.getGoogleBook(matchBooks[matchIdx])
        addBook(book)
    }

    function onClearSearch() {
        let x = 2
    }

    return (
        <section className="book-add">
            <button onClick={onSearchBooksDebounce}><span className="material-symbols-outlined">search</span></button>
            <input onChange={onSearchBooksDebounce}></input>
            {(matchBooks && matchBooks.length > 0) &&
                <ul className="search-res-list">
                    {matchBooks.map((matchBook, matchIdx) =>
                        <li key={matchIdx}>
                            <p>{matchBook.volumeInfo.title}</p>
                            <button onClick={() => onAddGoogleBook(matchIdx)}><i class="fa-solid fa-circle-plus"></i></button>
                        </li>)}
                </ul>
            }
            {matchBooks ?
                <button onClick={onClearSearch} className="filter-clear">
                    <span className="material-symbols-outlined">close</span>
                </button>
                : ''}
        </section>
    )
}
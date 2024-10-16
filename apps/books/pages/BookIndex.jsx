const { useState, useEffect } = React
const { useSearchParams, Link, Outlet } = ReactRouterDOM

import { bookService } from "../services/books.service.js"
import { utilService } from '../../../services/util.service.js'
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookAdd } from "../cmps/BookAdd.jsx"


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter(searchParams))


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('failed to load books', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => bookId !== book.id))
                showSuccessMsg('book removed successefully!')
            }).catch(err => {
                showErrorMsg('could not remove book')
            })
    }

    function addBook(book) {
        loadBooks()
    }

    if (!books) return <div>Loading...</div>

    return (
        <section className="book-main">
            <div>
                <h3>My Library</h3>
                <Link to="/book/edit"><span class="material-symbols-outlined">new_window</span></Link>
                <Link to="/book/dashboard"><span class="material-symbols-outlined">bar_chart</span></Link>
                
            </div>
            <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
            <BookAdd addBook={addBook} />
            <BookList books={books} onRemoveBook={onRemoveBook} />

            <Outlet/>
        </section>
    )
}
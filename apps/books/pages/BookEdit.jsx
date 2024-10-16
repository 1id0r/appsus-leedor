const { useState, useEffect } = React
const { Link, useNavigate, useParams } = ReactRouterDOM


import { bookService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    let { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log('book not found..', err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(book => {
                showSuccessMsg('Book Saved successfully')
            })
            .catch(err => {
                showErrorMsg(`Couldn't save book`)
            })
            .finally(() => {
                navigate('/book')
            })

    }

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
        if (field === 'amount' || field === 'currencyCode' || field === 'isOnSale') {
            setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, listPrice: { ...prevBookToEdit.listPrice, [field]: value } }))
        } else {
            setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
        }
    }

    function onBack() {
        navigate('/book')
    }

    if (!bookToEdit) return <div className="book-edit">Loading...</div>

    return (
        <React.Fragment>
            <div className="back-drop" onClick={onBack}></div>
            <div className="book-edit">
                <Link to="/book">x</Link>
                <h3>{bookId ? 'Edit' : 'Add'} Book</h3>
                <form onSubmit={onSaveBook}>
                    <label htmlFor="title">Title:</label>
                    <input
                        onChange={handleChange}
                        name="title"
                        type="text"
                        value={bookToEdit.title}
                        id="title">
                    </input>
                    <label htmlFor="subtitle">Subtitle:</label>
                    <input
                        onChange={handleChange}
                        name="subtitle"
                        type="text"
                        value={bookToEdit.subtitle}
                        id="subtitle">
                    </input>
                    <label htmlFor="author">Author:</label>
                    <input
                        onChange={handleChange}
                        name="authors"
                        type="text"
                        value={bookToEdit.authors.join(', ')}
                        id="author">
                    </input>
                    <label htmlFor="publish-date">Publish Year:</label>
                    <input
                        onChange={handleChange}
                        name="publishedDate"
                        type="number"
                        value={bookToEdit.publishedDate}
                        id="publish-date">
                    </input>
                    <label htmlFor="description">Description:</label>
                    <input className="big"
                        onChange={handleChange}
                        name="description"
                        type="text"
                        value={bookToEdit.description}
                        id="description">
                    </input>
                    <label htmlFor="page-count">Page Count:</label>
                    <input
                        onChange={handleChange}
                        name="pageCount"
                        type="number"
                        value={bookToEdit.pageCount}
                        id="page-count">
                    </input>
                    <label htmlFor="categories">Catagories:</label>
                    <input
                        onChange={handleChange}
                        name="categories"
                        type="text"
                        value={bookToEdit.categories}
                        id="categories">
                    </input>
                    <label htmlFor="language">Language:</label>
                    <input
                        onChange={handleChange}
                        name="language"
                        type="text"
                        value={bookToEdit.language}
                        id="language">
                    </input>
                    <label htmlFor="price">Price:</label>
                    <input
                        onChange={handleChange}
                        name="amount"
                        type="number"
                        value={bookToEdit.listPrice.amount}
                        id="price">
                    </input>
                    <label htmlFor="currency">Currency</label>
                    <input
                        onChange={handleChange}
                        name="currencyCode"
                        type="text"
                        value={bookToEdit.listPrice.currencyCode}
                        id="currency">
                    </input>
                    <label htmlFor="sale">Is it on sale?</label>
                    <input
                        onChange={handleChange}
                        name="isOnSale"
                        type="checkbox"
                        value={bookToEdit.listPrice.isOnSale}
                        id="sale">
                    </input>
                    <button>Save</button>
                </form>
            </div>
        </React.Fragment>
    )
}
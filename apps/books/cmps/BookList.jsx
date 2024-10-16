const { Link } = ReactRouterDOM

import { BookPreview } from '../cmps/BookPreview.jsx'


export function BookList({ books, onRemoveBook }) {

    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section class="book-list-btns">
                        <button>
                            <Link to={`/book/${book.id}`}><i class="fa-solid fa-circle-info"></i></Link>
                        </button>
                        <button>
                            <Link to={`/book/edit/${book.id}`}><i class="fa-solid fa-pen-to-square"></i></Link>
                        </button>
                        <button onClick={() => onRemoveBook(book.id)}><i class="fa-solid fa-trash"></i></button>
                    </section>
                </li>
            )}
        </ul>
    )
}
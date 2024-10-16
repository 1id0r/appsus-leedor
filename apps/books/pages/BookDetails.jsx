const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bookService } from "../services/books.service.js"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { AddReview } from "../cmps/AddReview.jsx"


export function BookDetails() {

    const [book, setBook] = useState(null)
    let { bookId } = useParams()

    useEffect(() => {
        bookService.get(bookId).then(setBook)
    }, [bookId])

    if (!book) return <div>Loading...</div>

    function getReadingLevel() {
        const { pageCount } = book
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        return 'Light Reading'
    }

    function getPriceClass() {
        const { amount } = book.listPrice
        if (amount > 150) return 'high'
        if (amount < 20) return 'low'
    }

    function onRemoveRating(reviewIdx) {
        bookService.removeReview(bookId, reviewIdx).then(setBook)
    }

    function onAddReview(bookWithReview) {
        setBook(bookWithReview)
    }

    const priceClass = getPriceClass()
    const readingLevel = getReadingLevel()


    return (
        <section className="book-details">
            <button className="book-routing-btn">
                <Link to={`/book/${book.prevBookId}`}><i class="fa-solid fa-arrow-left"></i></Link>
            </button>
            <button className="book-routing-btn">
                <Link to={`/book/${book.nextBookId}`}><i class="fa-solid fa-arrow-right"></i></Link>
            </button>
            <h1 className="book-title">{book.title}</h1>
            <h2 className="book-subtitle">{book.subtitle}</h2>
            <ul className="book-sub-details">
                <li>By: {book.authors.join(', ')}</li>
                <li>Published: {book.publishedDate}
                    {book.publishedDate < 2014 && ' Vintage'}
                    {book.publishedDate > 2023 && ' New!'}
                </li>
                <li>Page Count: {book.pageCount}
                    <span> {readingLevel}</span>
                </li>
                <li>Categories: {book.categories.join(', ')}</li>
                <li>Language: {book.language}</li>
            </ul>
            <div className="book-price-details">
                <p className={priceClass}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</p>
                {book.listPrice.isOnSale && <p>This book is on sale</p>}
            </div>
            <img src={book.thumbnail}></img>
            <button>
                <Link to={`/book/edit/${bookId}`}><i class="fa-solid fa-pen-to-square"></i></Link>
            </button>
            <button>
                <Link to="/book"><i class="fa-solid fa-rotate-left"></i></Link>
            </button>
            <LongTxt fullTxt={book.description} />

            <AddReview bookId={bookId} onAddReview={onAddReview} />
            {(book.reviews && book.reviews.length > 0) &&
                <ul className="reviews-list">
                    {book.reviews.map((review, reviewIdx) =>
                        <li key={reviewIdx}>
                            <h5>Reviewer's Name: {review.fullName}</h5>
                            <h5>Read the book at: {review.readAt}</h5>
                            <h5>Rate: {'★'.repeat(review.rating)}</h5>
                            <button onClick={() => onRemoveRating(reviewIdx)}><i class="fa-solid fa-trash"></i></button>
                        </li>)}
                </ul>
            }
        </section>
    )
}



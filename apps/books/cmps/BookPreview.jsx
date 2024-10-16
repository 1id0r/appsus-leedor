export function BookPreview({ book }) {
    const { title, listPrice, thumbnail, authors } = book

    return (
        <article className="book-preview">
            <img src={thumbnail}></img>
            <div className="preview-content">
                <h3>{title}</h3>
                <p>{authors.join(', ')} · {book.publishedDate}</p> 
                <p>{listPrice.amount.toLocaleString(undefined, { style: "currency", currency: listPrice.currencyCode })}</p>
            </div>
        </article>
    )
}
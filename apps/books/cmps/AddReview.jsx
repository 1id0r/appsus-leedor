const { useState } = React

import { bookService } from "../services/books.service.js"
import { RateBySelect } from "./RateBySelect.jsx"
import { RateByTextbox } from "./RateByTextbox.jsx"
import { RateByStars } from "./RateByStars.jsx"

export function AddReview({ bookId, onAddReview }) {

    const [reviewToAdd, setReviewToAdd] = useState(bookService.getEmptyReview())
    const [rateBy, setRateBy] = useState('select')

    function onSaveReview(ev) {
        ev.preventDefault()
        bookService.addReview(bookId, reviewToAdd)
            .then(onAddReview).then(setReviewToAdd(bookService.getEmptyReview()))
    }

    function handleChange({ target }) {
        console.log(reviewToAdd)
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
        setReviewToAdd(prevReviewToAdd => ({ ...prevReviewToAdd, [field]: value }))
    }

    function onChangeRateByView(ev) {
        setRateBy(ev.target.value)
    }

    function onSelected(rate) {
        console.log(rate)
        setReviewToAdd(prevReviewToAdd => ({ ...prevReviewToAdd, rating: rate }))
    }

    function DynamicRating(props) {
        switch (rateBy) {
            case 'stars':
                return <RateByStars {...props} />
                break;
            case 'select':
                return <RateBySelect  {...props} />
                break;
            case 'textbox':
                return <RateByTextbox  {...props} />
                break;

            default:
                break;
        }
    }

    function RateByRadio({ type }) {
        return (
            <React.Fragment>
                <input
                    onChange={onChangeRateByView}
                    type="radio"
                    name="rateBy"
                    id={type}
                    value={type}
                    checked={rateBy === type}>
                </input>
                <label htmlFor={type}>
                    {type.substring(0, 1).toUpperCase() + type.substring(1)}</label>
            </React.Fragment>
        )
    }

    return (
        <section className="book-review">
            <form className="add-review" onSubmit={onSaveReview}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    onChange={handleChange}
                    name="fullName"
                    type="text"
                    value={reviewToAdd.fullName}
                    id="fullName"
                    placeholder="Your name here..">
                </input>
                <label htmlFor="readAt">Read book at</label>
                <input
                    onChange={handleChange}
                    name="readAt"
                    type="date"
                    value={reviewToAdd.readAt}
                    id="readAt">
                </input>
                <label htmlFor="rating">Rating</label>
                <DynamicRating
                    value={reviewToAdd.rating}
                    onChange={handleChange}
                    onSelect={onSelected}
                    name="rating"
                    id="rating" 
                    rateBy={rateBy}/>
                <button className="save-btn"><span class="material-symbols-outlined">send</span></button>
            </form>
            <fieldset>
                <legend>Rate By:</legend>
                <RateByRadio type="select" />
                <RateByRadio type="stars" />
                <RateByRadio type="textbox" />
            </fieldset>

        </section>)
}
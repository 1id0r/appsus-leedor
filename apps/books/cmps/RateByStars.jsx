export function RateByStars({ onSelect, value }) {

    const stars = [1, 2, 3, 4, 5]


    return (
        <div>
            {stars.map(star =>
                <button
                    type="button"
                    className={`star-rating ${star <= value ? 'on' : ''}`}
                    onClick={() => onSelect(star)}>
                    ★
                </button>
            )
            }
        </div>
    )
}
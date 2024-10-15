

export function MailSort({ sortBy, onSetSort }) {


    return (
        <section className="mail-sort">
            <p onClick={() => onSetSort('date')} className={`sort-by ${sortBy.date ? 'on': ''}`}>
                <span>Date</span>
                <span>{sortBy.date === 1 ? <span className="material-symbols-outlined">arrow_upward_alt</span>
                    : <span className="material-symbols-outlined">arrow_downward_alt</span>
                }</span>
            </p>
            <p onClick={() => onSetSort('title')} className={`sort-by ${sortBy.title ? 'on': ''}`}>
                <span>Title</span>
                <span>{sortBy.title === 1 ? <span className="material-symbols-outlined">arrow_upward_alt</span>
                    : <span className="material-symbols-outlined">arrow_downward_alt</span>
                }</span>
            </p>
        </section>
    )
}
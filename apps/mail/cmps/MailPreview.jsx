const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

    const { from, subject, createdAt, id, isRead } = mail
    const date = new Date(createdAt)

    const sender = from.split('@')[0]

    return (
        <article className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
            <div>
                <input type="checkbox"></input>
                <button>☆</button>
            </div>
            <Link to={`/mail/${id}`} className="preview-content">
                <h4>{sender}</h4>
                <h4>{subject}</h4>
                <h4>{date.getDate()}.{date.getMonth()}</h4>
            </Link>
            <div>
                <button onClick={() => { onRemoveMail(id) }}>Delete</button>
                <button>Unread</button>
            </div>
        </article>
    )
}
const { Link } = ReactRouterDOM

export function MailPreview({ mail}) {

    const { from, subject, sentAt, id, body, createdAt } = mail

    const date = new Date(sentAt ? sentAt : createdAt)

    const sender = from.split('@')[0]
    

    return (
            <Link to={sentAt ? `/mail/${id}` : `/mail/compose?id=${id}`} className="mail-preview">
                <h4>{sender}</h4>
                <h4>{subject} <span>{body}</span></h4>
                <h4>{date.toLocaleString('default', { month: 'short' })} {date.getDate()}</h4>
            </Link>
    )
}
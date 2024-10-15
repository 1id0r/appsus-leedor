const { Link } = ReactRouterDOM

export function MailPreview({ mail}) {

    const { from, subject, sentAt, id, body } = mail
    const date = new Date(sentAt)

    const sender = from.split('@')[0]
    

    return (
            <Link to={`/mail/${id}`} className="mail-preview">
                <h4>{sender}</h4>
                <h4>{subject} <span>{body}</span></h4>
                <h4>{date.toLocaleString('default', { month: 'long' })} {date.getDate()}</h4>
            </Link>
    )
}
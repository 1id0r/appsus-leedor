const { Link } = ReactRouterDOM

export function MailPreview({ mail}) {

    const { from, subject, createdAt, id } = mail
    const date = new Date(createdAt)

    const sender = from.split('@')[0]
    

    return (
            <Link to={`/mail/${id}`} className="mail-preview">
                <h4>{sender}</h4>
                <h4>{subject}</h4>
                <h4>{date.getDate()}.{date.getMonth()}</h4>
            </Link>
    )
}
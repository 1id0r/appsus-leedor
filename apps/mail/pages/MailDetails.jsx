const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React


import { mailService } from "../services/mail.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const { mailId }= useParams()

    useEffect(() => {
        loadMail()
    })

    function loadMail(){
        mailService.get(mailId)
        .then(setMail)
        .catch(err=>{
            console.log('err loading mail', err)
        })
    }

    if (!mail) return <div>Loading..</div>

    const { from, to, subject, body, createdAt } = mail
    const date = new Date(createdAt)


    return (
        <section className="mail-details">
            <div>
                <button>Archive</button>
                <button>Spam</button>
                <button>delete</button>
                |
                <button>Unread</button>
                <button>Snooze</button>
                <button>Notes</button>
                |
                <button>Move to</button>
                <button>Label</button>
                <button>⋮</button>
                <button ><Link to={`/mail/${mail.prevMailId}`}>≺</Link></button>
                <button ><Link to={`/mail/${mail.nextMailId}`}>≻</Link></button>
            </div>
            <main>
            <h2>{subject}</h2>
                <header>
                    <h5>{from}</h5>
                    <h5>{to}</h5>
                    <h5>{date.getDate()}</h5>
                    <button>☆</button>
                    <button>↰</button>
                    <button>⋮</button>
                </header>
            </main>
            <p>{body}</p>
            <hr></hr>
            <aside>
                <button>↰Reply</button>
                <button>↱Forward</button>
                <button>☺︎</button>
            </aside>
        </section>
    )
}
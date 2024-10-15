const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React


import { mailService } from "../services/mail.service.js"

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const navigate = useNavigate()
    const { mailId } = useParams()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => {
                mail.isRead = true
                return mailService.save(mail)
            })
            .then(setMail)
            .catch(err => {
                console.log('err loading mail', err)
            })
    }

    if (!mail) return <div>Loading..</div>

    const { from, to, subject, body, sentAt } = mail
    const date = new Date(sentAt)

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => navigate('/mail'))
            .catch(err => {
                console.log('err removing mail' + mailId, err)
            })
    }

    function onSaveAsNote(){
        navigate(`/note/?title=${encodeURIComponent(subject)}&text=${encodeURIComponent(body)}`)
    }

    
    return (
        <section className="mail-details">
            <div className="top-btns">
                <button><span class="material-symbols-outlined">archive</span></button>
                <button><span class="material-symbols-outlined">report</span></button>
                <button onClick={() => { onRemoveMail(mail.id) }}><span class="material-symbols-outlined">delete</span></button>
                |
                <button><span class="material-symbols-outlined">mark_email_unread</span></button>
                <button><span class="material-symbols-outlined">schedule</span></button>
                <button onClick={()=>onSaveAsNote()}><img src='assets/img/keep.svg' alt='keep' /></button>
                |
                <button><span class="material-symbols-outlined">drive_file_move</span></button>
                <button><span class="material-symbols-outlined">label</span></button>
                <button><span class="material-symbols-outlined">more_vert</span></button>
                <button ><Link to={`/mail/${mail.prevMailId}`}><span class="material-symbols-outlined">chevron_left
                </span></Link></button>
                <button ><Link to={`/mail/${mail.nextMailId}`}><span class="material-symbols-outlined">chevron_right
                </span></Link></button>
            </div>
            <main>
                <h2>{subject}</h2>
                <div className="sub-header">
                    <h5>
                        <span class="from-preview">{from[0]}</span>
                        <span>{from}</span>
                    </h5>
                    <p>
                        <span>{to}</span>
                        <span>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {date.getHours()}:{date.getMinutes()}</span>
                        <button><span className="material-symbols-outlined">star</span></button>
                        <button><span class="material-symbols-outlined">reply</span></button>
                        <button><span class="material-symbols-outlined">more_vert</span></button>
                    </p>
                </div>
            </main>
            <p className="mail-body">{body}</p>
            <aside>
                <button><span class="material-symbols-outlined">reply</span> Reply</button>
                <button><span class="material-symbols-outlined">forward</span> Forward</button>
                <button><span class="material-symbols-outlined">sentiment_satisfied</span></button>
            </aside>
        </section >
    )
}
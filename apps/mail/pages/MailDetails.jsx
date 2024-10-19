const { useParams, useNavigate, Link } = ReactRouterDOM
const { useEffect, useState } = React


import { mailService } from '../services/mail.service.js'

export function MailDetails({ onToggleStarred }) {

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

    const { from, to, subject, body, sentAt, isStarred } = mail
    const date = new Date(sentAt)

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => navigate('/mail'))
            .catch(err => {
                console.log('err removing mail' + mailId, err)
            })
    }


    function onToggleStarred(mail) {
        const updatedMail = { ...mail, isStarred: !mail.isStarred }
        mailService
            .save(updatedMail)
            .then(setMail(updatedMail))
            .catch((err) => {
                console.log('err starring mail' + mail.id, err)
            })
    }

    console.log('rendere')
    function onSaveAsNote() {
        navigate(`/note/?title=${encodeURIComponent(subject)}&text=${encodeURIComponent(body)}`)
    }


    return (
        <section className="mail-details">
            <div className="top-btns">
                <Link to='/mail/'><span class="material-symbols-outlined">arrow_back</span></Link>
                <button onClick={() => { onRemoveMail(mail.id) }}><span className="material-symbols-outlined">delete</span></button>
                <button><span className="material-symbols-outlined">mark_email_unread</span></button>
                <button onClick={() => onSaveAsNote()}><img src='assets/img/keep.svg' alt='keep' /></button>
                <button><span className="material-symbols-outlined">drive_file_move</span></button>
                <button><span className="material-symbols-outlined">label</span></button>
                <button onClick={()=>window.print()}><span className="material-symbols-outlined">print</span></button>
                <Link to={`/mail/${mail.prevMailId}`}><span className="material-symbols-outlined">chevron_left
                </span></Link>
                <Link to={`/mail/${mail.nextMailId}`}><span className="material-symbols-outlined">chevron_right
                </span></Link>
            </div>
            <main>
                <h2>{subject}</h2>
                <div className="sub-header">
                    <h5>
                        <span className="from-preview">{from[0]}</span>
                        <span>
                            <p>{from}</p>
                            <p>to {to}</p>
                        </span>
                    </h5>
                    <p>
                        <span>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} {date.getHours()}:{date.getMinutes()}</span>
                        <button onClick={() => { onToggleStarred(mail) }} >
                            {mail.isStarred
                                ? <i className="fa-solid fa-star"></i>
                                : <i className="fa-regular fa-star"></i>}</button>
                        <button><span className="material-symbols-outlined">reply</span></button>
                        <button><span className="material-symbols-outlined">more_vert</span></button>
                    </p>
                </div>
            </main>
            <p className="mail-body">{body}</p>
            <aside>
                <button><span className="material-symbols-outlined">reply</span> Reply</button>
                <button><span className="material-symbols-outlined">forward</span> Forward</button>
            </aside>
        </section >
    )
}
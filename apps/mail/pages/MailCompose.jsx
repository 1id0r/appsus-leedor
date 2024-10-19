const { useState, useEffect, useRef } = React

const { useNavigate, useOutletContext, useSearchParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailCompose({ }) {

    const [searchParams, setSearchParams] = useSearchParams()
    const [mailToComp, setMailtoComp] = useState(mailService.getNewMailFromSearchParams(searchParams))
    const navigate = useNavigate()
    const { onUpdateMail } = useOutletContext()
    const intervalRef = useRef()

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            draftMail()
        }, 5000)
        return () => clearInterval(intervalRef.current)
    }, [mailToComp])

    function handleChange({ target }) {
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
        setMailtoComp(prevMailToComp => ({ ...prevMailToComp, [field]: value }))
    }
    
    function draftMail(){
        mailService.save(mailToComp)
            .then(savedMail => {
                setMailtoComp(savedMail)
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Couldn't draft mail`)
            })
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailToComp.sentAt = Date.now()
        mailService.save(mailToComp)
            .then(savedMail => {
                onUpdateMail(savedMail)
                showSuccessMsg('mail sent successfully')
            })
            .catch(err => {
                console.log(err)
                showErrorMsg(`Couldn't send mail`)
            })
            .finally(() => {
                clearInterval(intervalRef.current)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mailToComp) return <div><img src='assets/img/loader.svg' alt='Books' /></div>

    return (
        <React.Fragment>
            <div className="back-drop" onClick={onBack}></div>
            <div className="mail-compose">
                <header>
                    <h3>New Message</h3>
                    <button onClick={onBack}>x</button>
                </header>
                <form onSubmit={onSaveMail}>
                    <input
                        onChange={handleChange}
                        name="to"
                        type="text"
                        value={mailToComp.to}
                        placeholder="To"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        required>
                    </input>
                    <input
                        onChange={handleChange}
                        name="subject"
                        type="text"
                        value={mailToComp.subject}
                        placeholder="Subject"
                        required>
                    </input>
                    <textarea
                        className="big"
                        onChange={handleChange}
                        name="body"
                        value={mailToComp.body}
                        placeholder="Your mail here..">
                    </textarea>
                    <button>Send</button>
                </form>
            </div>
        </React.Fragment >
    )
}

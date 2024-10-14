const { useState } = React
const { useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

export function MailCompose() {

    const [mailToComp, setMailtoComp] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()


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

    function onSaveMail(ev){
        ev.preventDefault()
        mailService.save(mailToComp)
            .then(mail => {
                showSuccessMsg('mail sent successfully')
            })
            .catch(err => {
                showErrorMsg(`Couldn't send mail`)
            })
            .finally(() => {
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mailToComp) return <div className="mail-compose">Loading...</div>

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
                    <input className="big"
                        onChange={handleChange}
                        name="body"
                        type="text"
                        value={mailToComp.body}
                        placeholder="Your mail here..">
                    </input>
                    <button>Send</button>
                </form>
            </div>
        </React.Fragment>
    )
}

import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onToggleRead }) {


    return (
        <ul className="mail-list">
            {mails.map((mail) =>
                <li key={mail.id} className={`mail ${mail.isRead ? 'read' : 'unread'}`}>
                    <div>
                        <input type="checkbox"></input>
                        <button>☆</button>
                    </div>
                    <MailPreview mail={mail}/>
                    <div>
                        <button onClick={() => { onRemoveMail(mail.id) }}>🗑️</button>
                        <button onClick={() => { onToggleRead(mail)}}>{!mail.isRead ? '📨' : '✉️'}</button>
                    </div>
                </li>
            )}
        </ul>)
}

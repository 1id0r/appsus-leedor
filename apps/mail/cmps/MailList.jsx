import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onToggleRead }) {


    return (
        <ul className="mail-list">
            {mails.map((mail) =>
                <li key={mail.id} className={`mail ${mail.isRead ? 'read' : 'unread'}`}>
                    <div>
                        <input type="checkbox"></input>
                        <button><span class="material-symbols-outlined">star</span></button>
                    </div>
                    <MailPreview mail={mail} />
                    <div>
                        <button onClick={() => { onRemoveMail(mail.id) }}>
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        <button onClick={() => { onToggleRead(mail) }}>
                            {!mail.isRead
                                ? <span class="material-symbols-outlined">mark_email_read</span>
                                : <span class="material-symbols-outlined">mark_email_unread</span>}
                        </button>
                    </div>
                </li>
            )}
        </ul>)
}

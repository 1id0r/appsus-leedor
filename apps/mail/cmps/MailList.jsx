const { Link, Outlet } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx";
import { MailSort } from "../cmps/MailSort.jsx"


export function MailList({ mails, onRemoveMail, onToggleRead, sortBy, onSetSort }) {


    return (
        <ul className="mail-list">
            <li>
                <MailSort sortBy={sortBy} onSetSort={onSetSort} />
            </li>
            {mails.map((mail) =>
                <li key={mail.id} className={`mail ${mail.isRead ? 'read' : 'unread'}`}>
                    <div>
                        <span className="material-symbols-outlined">check_box_outline_blank</span>
                        <span className="material-symbols-outlined">star</span>
                    </div>
                    <MailPreview mail={mail} />
                    <div>
                        <button onClick={() => { onRemoveMail(mail.id) }}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                        <button onClick={() => { onToggleRead(mail) }}>
                            {!mail.isRead
                                ? <span className="material-symbols-outlined">mark_email_read</span>
                                : <span className="material-symbols-outlined">mark_email_unread</span>}
                        </button>
                    </div>
                </li>
            )}
        </ul>)
}

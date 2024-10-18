
import { MailPreview } from "./MailPreview.jsx";
import { MailSort } from "../cmps/MailSort.jsx"


export function MailList({ mails, onRemoveMail, onToggleRead, onToggleStarred, sortBy, onSetSort }) {


    return (
        <div className="mail-list">
            <h5>
                <MailSort sortBy={sortBy} onSetSort={onSetSort} />
            </h5>
            <ul>
                {mails.map((mail) =>
                    <li key={mail.id} className={`mail ${mail.isRead ? 'read' : 'unread'}`}>
                        <div>
                            <span className="material-symbols-outlined">check_box_outline_blank</span>
                            <span onClick={() => { onToggleStarred(mail) }} className="material-symbols-outlined">
                                {mail.isStarred
                                    ?  <i className="fa-solid fa-star"></i>
                                    :  <i className="fa-regular fa-star"></i>}</span>
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
            </ul>
        </div>)
}

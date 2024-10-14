import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail }) {


    return (
        <ul className="mail-list">
            {mails.map((mail) =>
                <li key={mail.id}>
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail}/>
                </li>
            )}
        </ul>)
}

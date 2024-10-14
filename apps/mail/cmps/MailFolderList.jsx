
export function MailFolderList({unreadCount}) {

    return (
        <section className="Mail-folder-list">
            <p>Inbox {unreadCount}</p>
            <p>Starred</p>
            <p>Sent</p>
            <p>Draft</p>
            <p>Trash</p>
        </section>
    )
}
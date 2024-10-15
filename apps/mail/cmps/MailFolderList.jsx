const { useState, useEffect } = React


export function MailFolderList({ onSetFilter, stats }) {

    function onChooseFolder(val) {
        if (typeof val === 'string') {
            onSetFilter({ status: val })
        } else {
            onSetFilter({ isStarred: val })
        }
    }

    if (!stats) return <div></div>

    return (
        <section className="mail-folder-list">
            <p onClick={() => onChooseFolder('inbox')}>
                <span className="material-symbols-outlined">inbox</span>
                <span>Inbox</span>
                <span>{stats.isRead === 0 ? ' ': stats.isRead}</span>
            </p>
            <p onClick={() => onChooseFolder(true)}>
                <span className="material-symbols-outlined">star</span>
                <span>Starred</span>
                <span>{stats.starred === 0 ? ' ': stats.starred}</span>
            </p>
            <p onClick={() => onChooseFolder('sent')}>
                <span className="material-symbols-outlined">send</span>
                <span>Sent</span>
                <span>{stats.sent === 0 ? ' ': stats.sent}</span>
            </p>
            <p onClick={() => onChooseFolder('draft')}>
                <span className="material-symbols-outlined">draft</span>
                <span>Draft</span>
                <span>{stats.draft === 0 ? ' ': stats.draft}</span>
            </p>
            <p onClick={() => onChooseFolder('trash')}>
                <span className="material-symbols-outlined">delete</span>
                <span>Trash</span>
                <span>{stats.trash === 0 ? ' ': stats.trash}</span>
            </p>
        </section>
    )
}
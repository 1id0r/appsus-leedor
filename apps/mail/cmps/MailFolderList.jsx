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
                <span class="material-symbols-outlined">inbox</span>
                <span>Inbox</span>
                <span>{stats.isRead}</span>
            </p>
            <p onClick={() => onChooseFolder(true)}>
                <span class="material-symbols-outlined">star</span>
                <span>starred</span>
                <span>{stats.starred}</span>
            </p>
            <p onClick={() => onChooseFolder('sent')}>
                <span class="material-symbols-outlined">send</span>
                <span>Sent</span>
                <span>{stats.sent}</span>
            </p>
            <p onClick={() => onChooseFolder('draft')}>
                <span class="material-symbols-outlined">draft</span>
                <span>Draft</span>
                <span>{stats.draft}</span>
            </p>
            <p onClick={() => onChooseFolder('trash')}>
                <span class="material-symbols-outlined">delete</span>
                <span>Trash</span>
                <span>{stats.trash}</span>
            </p>
        </section>
    )
}
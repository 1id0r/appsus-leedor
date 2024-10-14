const { useState, useEffect } = React


export function MailFolderList({onSetFilter, stats}) {

        function onChooseFolder(val){
            if(typeof val === 'string'){
                onSetFilter({status: val})
            } else{
                onSetFilter({isStarred: val})
            }
        }

    if(!stats) return <div></div>
    
    return (
        <section className="Mail-folder-list">
            <p onClick={()=>onChooseFolder('inbox')}>Inbox {stats.isRead}</p>
            <p onClick={()=>onChooseFolder(true)}>Starred {stats.starred}</p>
            <p onClick={()=>onChooseFolder('sent')}>Sent {stats.sent}</p>
            <p onClick={()=>onChooseFolder('draft')}>Draft  {stats.draft}</p>
            <p onClick={()=>onChooseFolder('trash')}>Trash  {stats.trash}</p>
        </section>
    )
}
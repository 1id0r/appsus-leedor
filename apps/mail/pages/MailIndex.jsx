const { Link, Outlet } = ReactRouterDOM
const { useState, useEffect } = React


import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"

import { mailService } from "../services/mail.service.js"


export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [stats, setStats] = useState(null)

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(mails => {
                setMails(mails)
                loadStats(mails)
            })
            .catch(err => {
                console.log('err loading mails', err)
            })

    }

    function loadStats(mails) {
        setStats(mailService.getStats(mails))

    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => {
                    mails.filter(mail => mail.id !== mailId)
                })
            })
            .catch(err => {
                console.log('err removing mail' + mailId, err)
            })
    }

    function onToggleRead(mail) {
        console.log(mail)
        mail.isRead = !mail.isRead
        mailService.save(mail)
            .then(updatedMail => {
                const idx = mails.findIndex(prevMail => prevMail.id === mail.id)
                setMails(prevMails => {
                    const newMails = [...prevMails]
                    newMails[idx] = updatedMail
                    return newMails
                })
                loadStats(mails)
            })
            .catch(err => {
                console.log('err editing mail' + mail.id, err)
            })
    }


    function onSetFilter(filterByToEdit) {
        if (!filterByToEdit) setFilterBy(mailService.getDefaultFilter())
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }

    if (!mails) return <div>Loading..</div>


    return (
        <div>
            <div className="mail-main">
                <div className="mail-folders">
                    <Link to="/mail/compose">
                    <span class="material-symbols-outlined">edit</span> 
                    Compose</Link>
                    <MailFolderList onSetFilter={onSetFilter} stats={stats} />
                </div>
                <div className="mail-content">
                    <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onToggleRead={onToggleRead} />
                </div>
                <nav className="side-nav"></nav>
                <Outlet />
            </div>
        </div>)

}

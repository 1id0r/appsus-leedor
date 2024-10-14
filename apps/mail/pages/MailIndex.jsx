const { Link, Outlet }= ReactRouterDOM
const { useState, useEffect }= React


import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailFolderList } from "../cmps/MailFolderList.jsx"
import { MailList } from "../cmps/MailList.jsx"

import { mailService } from "../services/mail.service.js"


export function MailIndex() {

    const [mails, setMails]= useState(null)
    const [filterBy, setFilterBy]= useState(null)

    useEffect(()=>{
        loadMails()
    })

    function loadMails(){
        mailService.query()
        .then(setMails)
        .catch(err=>{
            console.log('err loading mails', err)
        })
    }

    function onRemoveMail(mailId){
        mailService.remove(mailId)
        .then(()=>{
            setMails(mails=>{
                mails.filter(mail=> mail.id !== mailId)
            })
        })
        .catch(()=>{
            console.log('err removing mail'+mailId, err)
        })
    }

    function getUnread(){
       return 4
    }

    if(!mails) return <div>Loading..</div>


    return <div>
        <div>
        <Link to="/mail/compose" >New Mail</Link>
        <MailFolderList unreadCount={getUnread()}/>
        </div>
        <MailFilter/>
        <MailList mails={mails} onRemoveMail={onRemoveMail}/>
        <Outlet/>
    </div>
}


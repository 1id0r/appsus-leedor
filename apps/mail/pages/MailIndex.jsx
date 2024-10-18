const { Link, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderList } from '../cmps/MailFolderList.jsx'
import { MailList } from '../cmps/MailList.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {
  const [mails, setMails] = useState(null)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [sortBy, setSortBy] = useState(mailService.getDefaultSort())
  const [stats, setStats] = useState(null)


  useEffect(() => {
    loadMails()
  }, [filterBy, sortBy])

  function loadMails() {
    mailService
      .query(filterBy, sortBy)
      .then((mails) => {
        setMails(mails)
        loadStats()
      })
      .catch((err) => {
        console.log('err loading mails', err)
      })
  }

  function loadStats() {
    mailService.getStats().then(setStats)
  }

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
      })
      .catch((err) => {
        console.log('err removing mail' + mailId, err)
      })
  }

  function onToggleRead(mail) {
    const updatedMail = { ...mail, isRead: !mail.isRead }
    mailService
       .save(updatedMail)
       .then((updatedMail) => {
          const idx = mails.findIndex((prevMail) => prevMail.id === updatedMail.id)
          setMails((prevMails) => {
             const newMails = [...prevMails]
             newMails[idx] = updatedMail
             return newMails
          })
          loadStats()
       })
       .catch((err) => {
          console.log('err toggling read/unread mail' + updatedMail.id, err)
       })
 }
 
 function onToggleStarred(mail) {
    const updatedMail = { ...mail, isStarred: !mail.isStarred }
    mailService
       .save(updatedMail)
       .then((updatedMail) => {
          const idx = mails.findIndex((prevMail) => prevMail.id === updatedMail.id)
          setMails((prevMails) => {
             const newMails = [...prevMails]
             newMails[idx] = updatedMail
             return newMails
          })
          loadStats()
       })
       .catch((err) => {
          console.log('err starring mail' + updatedMail.id, err)
       })
 }
 

  function onSetFilter(filterByToEdit) {
    if (!filterByToEdit) setFilterBy(mailService.getDefaultFilter())
    setFilterBy((filterBy) => ({ ...filterBy, ...filterByToEdit }))
  }

  function onSetSort(sortKey) {
    const clearSort = mailService.getDefaultSort()
    const newSort={ ...clearSort, [sortKey]: !sortBy[sortKey] ? 1 : -sortBy[sortKey] }
    setSortBy(newSort)
  }

  function onUpdateMail(savedMail) {
    setMails((prevMails) => [...prevMails, savedMail])
    loadStats(mails)
  }

  if (!mails) return <div>Loading..</div>

  return (
    <div>
      <div className='mail-main'>
        <div className='mail-folders'>
          <Link to='/mail/compose'>
            <span className='material-symbols-outlined'>edit</span>
            <span>Compose</span>
          </Link>
          <MailFolderList onSetFilter={onSetFilter} stats={stats} />
        </div>
        <div className='mail-content'>
          <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} />
          <MailList
            mails={mails}
            onRemoveMail={onRemoveMail}
            onToggleRead={onToggleRead}
            onToggleStarred={onToggleStarred}
            sortBy={sortBy}
            onSetSort={onSetSort}
          />
        </div>
        <nav className='side-nav'></nav>
        <Outlet context={{ onUpdateMail }} />
      </div>
    </div>
  )
}

// mail service

// const mail = {
//     id: 'e101',
//     createdAt : 1551133930500,
//     subject: 'Miss you!'
//     ,
//     body: 'Would love to catch up sometimes'
//     ,
//     isRead: false,
//     sentAt : 1551133930594,
//     removedAt : null,
//     from: 'momo@momo.com',
//     to: 'user@appsus.com'
//     }

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma AppSus'
}

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getDefaultSort,
    getStats,
}

function query(filterBy = {}, sortBy={}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.status) {
                switch (filterBy.status) {
                    case 'inbox': return mails
                        break;
                    case 'sent': mails = mails.filter(mail => mail.from === loggedInUser.email)
                        break;
                    case 'trash': return mails
                        break;
                    case 'draft': mails = mails.filter(mail => !mail.sentAt)
                        break;
                }
            }
            if (filterBy.starred) {
                mails = mails.filter(mail => mail.isStarred === filterBy.starred)
            }
            if(sortBy.date) mails.sort((a,b)=>(a.sentAt - b.sentAt)* sortBy.date)
            if(sortBy.title) mails.sort((a,b)=>(a.subject.localeCompare(b.subject)* sortBy.title))
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        mail.createdAt = mail.sentAt = Date.now()
        mail.from = loggedInUser.email
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt = '', subject = '', body = '', from = '', isRead = false, sentAt = '', removedAt = null, to = '', isStarred = false) {
    return { createdAt, subject, body, from, isRead, sentAt, removedAt, to, isStarred }
}


function getDefaultFilter() {
    return {
        status: '', // 'inbox/sent/trash/draft'
        txt: '', // no need to support complex text search
        isRead: '', // (optional property, if missing: show all)
        isStarred: '', // (optional property, if missing: show all)
        labels: [] // has any of the labels }
    }
}

function getDefaultSort() {
    return {
        date: '', 
        title: '',
    }
}



function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com', false, utilService.getRandomTimestamp()),
            _createMail('Meeting Reminder', 'Just a reminder about our meeting tomorrow.', 'boss@company.com', false, utilService.getRandomTimestamp()),
            _createMail('Your Invoice', 'Please find your invoice attached.', 'billing@company.com', true, utilService.getRandomTimestamp()),
            _createMail('Newsletter Update', 'Check out our latest updates and offers!', 'newsletter@company.com', true, utilService.getRandomTimestamp()),
            _createMail('Job Application', 'Thank you for your application. We will get back to you soon.', 'hr@company.com', false, utilService.getRandomTimestamp()),
            _createMail('Happy Birthday!', 'Wishing you a fantastic birthday filled with joy!', 'friend@social.com', utilService.getRandomTimestamp()),
            _createMail('Project Update', 'The project is on track for the next milestone.', 'manager@company.com', false, utilService.getRandomTimestamp()),
            _createMail('Dinner Invitation', 'You are invited to dinner at my place this weekend!', 'inviter@social.com', false, utilService.getRandomTimestamp()),
            _createMail('Weekly Summary', 'Here is your weekly summary of activities.', 'newsletter@company.com', true, utilService.getRandomTimestamp()),
            _createMail('Feedback Request', 'We value your feedback. Please share your thoughts!', 'support@company.com', false, utilService.getRandomTimestamp())
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from, isRead = false, sentAt) {
    const mail = getEmptyMail(Date.now(), subject, body, from, isRead, sentAt, null,)
    mail.id = utilService.makeId()
    return mail
}


function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}



function getStats(mails) {
    const stats = mails.reduce((acc, mail) => {
        if (!mail.isRead) acc.isRead++
        if (!mail.sentAt) acc.draft++
        if (mail.isStarred) acc.starred++
        if (mail.from === loggedInUser.email) acc.sent++
        return acc
    }, { isRead: 0, draft: 0, trash: 0, starred: 0, sent: 0 })
    return stats; // Returning stats for potential further use
}

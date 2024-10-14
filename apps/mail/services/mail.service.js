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
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.vendor))
            }
            if (filterBy.minSpeed) {
                mails = mails.filter(mail => mail.speed >= filterBy.minSpeed)
            }
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
        mail.createdAt= mail.sentAt = Date.now()
        mail.from = loggedInUser.email
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt = '', subject = '', body = '', from = '', isRead = false, sentAt = '', removedAt = null, to = '') {
    return { createdAt, subject, body, from ,isRead, sentAt, removedAt, to }
}


function getDefaultFilter() {
    return {
        status: '', // 'inbox/sent/trash/draft'
        txt: '', // no need to support complex text search
        isRead: '', // (optional property, if missing: show all)
        isStared: '', // (optional property, if missing: show all)
        labels: [] // has any of the labels }
    }
}



function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com',false, utilService.getRandomTimestamp(7)),
            _createMail('Meeting Reminder', 'Just a reminder about our meeting tomorrow.', 'boss@company.com',false, utilService.getRandomTimestamp(6)),
            _createMail('Your Invoice', 'Please find your invoice attached.', 'billing@company.com', true, utilService.getRandomTimestamp(5)),
            _createMail('Newsletter Update', 'Check out our latest updates and offers!', 'newsletter@company.com', true, utilService.getRandomTimestamp(4)),
            _createMail('Job Application', 'Thank you for your application. We will get back to you soon.', 'hr@company.com',false, utilService.getRandomTimestamp(3)),
            _createMail('Happy Birthday!', 'Wishing you a fantastic birthday filled with joy!', 'friend@social.com', utilService.getRandomTimestamp(10)),
            _createMail('Project Update', 'The project is on track for the next milestone.', 'manager@company.com', false, utilService.getRandomTimestamp(9)),
            _createMail('Dinner Invitation', 'You are invited to dinner at my place this weekend!', 'inviter@social.com', false, utilService.getRandomTimestamp(8)),
            _createMail('Weekly Summary', 'Here is your weekly summary of activities.', 'newsletter@company.com', true, utilService.getRandomTimestamp(7)),
            _createMail('Feedback Request', 'We value your feedback. Please share your thoughts!', 'support@company.com', false, utilService.getRandomTimestamp(6))
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, from, isRead = false, sentAt) {
    const mail = getEmptyMail(Date.now(), subject, body, from, isRead, sentAt, null, )
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


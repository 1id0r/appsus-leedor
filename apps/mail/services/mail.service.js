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

import { loadFromStorage, makeId, saveToStorage } from './services/util.service.js'
import { storageService } from './services/async-storage.service.js'

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
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt = '', subject = '', body = '', isRead = false, sentAt = '', removedAt = null, from = '', to = 'user@appsus.com') {
    return { createdAt, subject, body, isRead, sentAt, removedAt, from, to }
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
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createmail('audu', 300),
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(vendor, speed = 250) {
    const mail = getEmptyMail(vendor, speed)
    mail.id = makeId()
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


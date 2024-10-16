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
    getNewMailFromSearchParams,
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
        mails = []
        mails.push(_createMail('🔒 Urgent: Your Account Has Been Compromised', 'Click here immediately to secure your account: [malicious link]', 'scam@security.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Limited Time Offer: Get 50% OFF!', 'Shop our exclusive deals now and enjoy 50% off on all items. Offer ends soon!', 'promo@shopping.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('You Won a Prize! Claim Your Reward Now', 'Congratulations! You’ve been selected as the winner of our $1,000 gift card giveaway. Claim your prize here: [phishing link]', 'scam@prize.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Invoice Inquiry', 'Could you please confirm if the invoice was received and processed?', 'user@appsus.com', true, utilService.getRandomTimestamp(), null, 'billing@services.com'))
        mails.push(_createMail('Your Package Is On the Way!', 'Great news! Your package is out for delivery and will arrive tomorrow.', 'shipping@ecommerce.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Friendly Reminder: Appointment Tomorrow at 2 PM', 'Just reminding you of your appointment scheduled for tomorrow. See you then!', 'reminder@calendar.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Monthly Newsletter: Stay Updated!', 'Here’s what’s new this month at our company. Check out our blog and product updates.', 'newsletter@company.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Final Notice: Payment Due', 'Your payment is overdue. Please settle the amount to avoid service interruption.', 'billing@services.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Join Our Event!', 'We’d love for you to join us at our annual networking event. RSVP here.', 'events@social.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))
        mails.push(_createMail('Security Alert: Suspicious Activity Detected', 'We noticed some unusual activity on your account. Please review and secure your account immediately.', 'alerts@security.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Unblock Me Now!', 'I cannot believe you blocked me! After everything we’ve been through, this is how you treat me? You better have a good reason. This is NOT over!', 'blocked.ex@gf.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Invite: Join Our Beta Testing Program', 'We’d love for you to test our latest software! Get early access and give us your feedback.', 'beta@software.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Weekend Plans', 'I was thinking we could grab dinner this weekend. Let me know if you’re free!', 'user@appsus.com', true, utilService.getRandomTimestamp(), null, 'friend@social.com'))
        mails.push(_createMail('Your Job Application Status', 'Thank you for applying! We are reviewing your application and will get back to you soon.', 'hr@company.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Flash Sale: 70% OFF All Items!', 'Hurry! This is a limited-time offer you don’t want to miss!', 'sales@shopping.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))
        mails.push(_createMail('Survey: We’d Love Your Feedback', 'Please take a few moments to complete our customer satisfaction survey.', 'support@services.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Your Subscription Will Expire Soon', 'Your subscription is about to expire. Renew now to keep enjoying our services.', 'billing@subscriptions.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Action Required: Update Your Account Info', 'Please update your account information to avoid suspension.', 'support@company.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Follow-up on our Project', 'Hey, just checking in on the progress of the project. Let me know if you need any assistance!', 'user@appsus.com', true, utilService.getRandomTimestamp(), null, 'colleague@company.com'))
        mails.push(_createMail('Happy Anniversary with Us!', 'Thank you for being a loyal customer for 2 years. We have a special gift for you!', 'support@company.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Your Friend Tagged You in a Photo', 'Check out the latest photo you’ve been tagged in!', 'notifications@socialmedia.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Job Offer: Join Our Team!', 'We are pleased to offer you a position at our company. Please see the attached offer letter.', 'recruitment@company.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))  
        mails.push(_createMail('Travel Booking Confirmed', 'Your flight and hotel booking are confirmed. Have a great trip!', 'booking@travel.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com'))
        mails.push(_createMail('New Comment on Your Post', 'Someone commented on your post: "Great job!"', 'notifications@socialmedia.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Password Reset Request', 'You’ve requested to reset your password. If this wasn’t you, please contact support immediately.', 'support@security.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Congratulations! You’ve Been Approved!', 'Your application has been approved. Welcome aboard!', 'admin@platform.com', false, utilService.getRandomTimestamp(), null, 'user@appsus.com'))
        mails.push(_createMail('Reminder: Your Subscription Renews Tomorrow', 'Your subscription will automatically renew tomorrow. No action is needed unless you wish to cancel.', 'subscriptions@services.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com')) 
        mails.push(_createMail('Ticket Confirmation: Concert Tonight', 'Your ticket for the concert tonight has been confirmed. Enjoy the show!', 'tickets@events.com', true, utilService.getRandomTimestamp(), null, 'user@appsus.com'))
        mails.push(_createMail('FYI: Server Maintenance', 'Just a heads-up: the server will be down for maintenance from 3 AM to 6 AM tomorrow.', 'user@appsus.com', true, utilService.getRandomTimestamp(), null, 'it@company.com'))
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

function getNewMailFromSearchParams(searchParams) {
    const subject = searchParams.get('subject') || ''
    const body = searchParams.get('body') || ''
    const mail=  getEmptyMail()
    mail.subject= subject
    mail.body= body

    return mail
}

const { useState, useEffect } = React

import { mailService } from "../services/mail.service.js"

export function MailSort({ sortBy, onSetSort }) {

    useEffect(()=>{

    },[sortBy])

    return (
        <section className="mail-sort">
            <p onClick={() => onSetSort('date')}>
                <span className="material-symbols-outlined">calendar_month</span>
                <span>Date</span>
                <span>{sortBy.date === 1 ? <span className="material-symbols-outlined">arrow_upward_alt</span>
                    : <span className="material-symbols-outlined">arrow_downward_alt</span>
                }</span>
            </p>
            <p onClick={() => onSetSort('title')}>
                <span className="material-symbols-outlined">title</span>
                <span>Title</span>
                <span>{sortBy.title === 1 ? <span className="material-symbols-outlined">arrow_upward_alt</span>
                    : <span className="material-symbols-outlined">arrow_downward_alt</span>
                }</span>
            </p>
        </section>
    )
}
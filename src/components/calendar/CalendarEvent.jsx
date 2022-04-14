import React from 'react'

export const CalendarEvent = ({event}) => {
    const {title, user} = event;
    const {name} = user;
    return (
        <div>
            <span>{title}</span>
            <strong> -{name}</strong>
        </div>
    )
}

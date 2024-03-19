import React from 'react'
import '../styles/css/hours.css'
import Restaurant from '../images/hours.jpeg'

function Hours() {
    const hours = [
        { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 8:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 10:00 PM' },
        { day: 'Saturday', hours: '9:00 AM - 10:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
    ]

    return (
        <div
            className="bg-image"
            style={{ backgroundImage: `url(${Restaurant})`, height: '100vh' }}
        >
            <div className="hours-wrapper">
                <div className="hours">
                    <h2>Restaurant Hours</h2>
                    <ul>
                        {hours.map((item, index) => (
                            <li key={index}>
                                <strong>{item.day}</strong>:{' '}
                                <b>{item.hours}</b>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Hours

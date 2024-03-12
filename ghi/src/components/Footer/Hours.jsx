import React from 'react'
import '../../styles/css/hours.css' 

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
        <div className="hours">
            <h2>Restaurant Hours</h2>
            <ul>
                {hours.map((item, index) => (
                    <li key={index}>
                        <strong>{item.day}</strong>: {item.hours}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Hours

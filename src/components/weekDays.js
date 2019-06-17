import React from 'react';
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export const WeekDays = () => {
    return(
        <div className="dayNameContainer">
            {days.map((day, key) => (
                <div key={key} className="dayName">
                    {day}
                </div>
            ))}
        </div>
    )
}
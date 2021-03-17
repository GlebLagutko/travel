import React from 'react';
import {useSelector} from 'react-redux'


const languageState = state => state.value.language;
export default function DateWidget({country}) {


    const language = useSelector(languageState);

    const dayOfWeek = new Date().toLocaleString(`${language}-${language.toUpperCase()}`, {
        timeZone: country.timezone,
        weekday: "short"
    });
    const month = new Date().toLocaleString(`${language}-${language.toUpperCase()}`, {
        timeZone: country.timezone,
        month: "short"
    });
    const day = new Date().toLocaleString(`${language}-${language.toUpperCase()}`, {
        timeZone: country.timezone,
        day: "numeric"
    });

    return (
        <div className='date-div'>
            <div className='dayOfWeek-div'><strong>{dayOfWeek}</strong></div>
            <div className='day-div'>{day}</div>
            <div>{month}</div>
        </div>
    );
}

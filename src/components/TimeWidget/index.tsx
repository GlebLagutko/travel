import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default function ClockWidget({country}) {
    const [value, setValue] = useState(new Date(new Date().toLocaleString("en-US", {timeZone: country.timezone})));

    useEffect(() => {
        const interval = setInterval(
            () => setValue(new Date(new Date().toLocaleString("en-US", {timeZone: country.timezone}))),
            1000
        );

        return () => {
            clearInterval(interval);
        }
    }, []);

    return (
        <div className="clocks">
            <Clock value={value} size={100}/>
        </div>
    )
}

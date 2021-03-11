import {WeatherIcon} from 'react-open-weather';
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import set = Reflect.set;


const languageState = state => state.value.language;

export const WeatherWidget = ({city, cityCoordinates}) => {

    const language = useSelector(languageState);

    const [data, setData] = useState({
        weather: false, main: undefined
    });


    useEffect(() => {


        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da9c9689fa19ac3ed3a29bbd3670acdc&lang=${language}&units=metric`)
            .then(response => response.json()).then(result => {
            console.log('-------------')
            setData(result);
            console.log(data)
        });

    }, [language]);

    // @ts-ignore
    return (
        <div className='weather-div'>
            <div className='weather-info'>
                <div>{data.weather ? data.main.temp : 0}°C</div>
                <div>{data.weather ? data.weather[0].description : 0}</div>
            </div>
            <div className="weather-icon">
                <img src={`http://openweathermap.org/img/wn/${data.weather ? data.weather[0].icon : ''}@2x.png`}
                     style={{height: "40px"}}/>
            </div>
        </div>
    )

};

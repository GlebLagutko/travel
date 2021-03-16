import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {createStyles, fade, Theme, makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Clear, ClearOutlined} from "@material-ui/icons";
import {SelectLanguage} from "../SelectLanguage";
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

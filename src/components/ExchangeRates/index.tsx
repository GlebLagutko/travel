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


export default function ExchangeWidget({country}) {

    const [rates, setRates] = useState([0, 0, 0])

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/3402d928822e13d5d341634b/latest/${country.currency}`)
            .then(response => response.json()).then(result => {
            const ratesNew = [];
            ratesNew.push(result.conversion_rates.USD);
            ratesNew.push(result.conversion_rates.EUR);
            ratesNew.push(result.conversion_rates.BYN);
            setRates(ratesNew);
        })
    }, [])

    return (
        <div className='exchange'>
            <div style={{color: 'black'}}><strong>{country.currency}</strong></div>
            <div className="exchange-div">
                <div><strong>USD</strong> : {rates[0]}</div>
                <div><strong>EUR</strong> : {rates[1]}</div>
                <div><strong>BYN</strong> : {rates[2]}</div>
            </div>
        </div>
    );
}

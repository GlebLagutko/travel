import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {SelectLanguage} from "../SelectLanguage";
import {Link} from 'react-router-dom';
import {CHANGE_COUNTRY} from "../../store/actions/ChangeCountry";
import {useDispatch, useSelector} from "react-redux";
import {Home} from "@material-ui/icons";
import {UserInfo} from "../UserInfo";
import {saveState} from "../../store/SaveState";
import store from "../../store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: "100%",
        },

        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        home: {
            display: 'flex',
            cursor: 'pointer',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },

        },

    }),
);

interface HeaderProps {
    changeHolder(newValue: string): void
}

const countryState = state => state.value.country;

export default function CountryHeader({country}) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const countryInfo = useSelector(countryState);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography onClick={() => {
                        dispatch({type: CHANGE_COUNTRY, value: {urlName: 'Main page'}});
                        saveState(store);
                    }} className={classes.home + ' home-icon'} variant="h6" noWrap>
                        <Home/>
                    </Typography>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {country}
                    </Typography>
                    <SelectLanguage/>
                    <UserInfo/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

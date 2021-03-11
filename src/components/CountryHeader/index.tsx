import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles';
import {SelectLanguage} from "../SelectLanguage";
import {Link} from 'react-router-dom';

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

    }),
);

interface HeaderProps {
    changeHolder(newValue: string): void
}

export default function CountryHeader() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Link to={`/`} style={{textDecoration: "none"}}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Home
                    </Typography>
                    </Link>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Travel app
                    </Typography>
                    <SelectLanguage/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

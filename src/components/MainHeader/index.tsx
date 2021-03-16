import React, {useRef} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {createStyles, fade, makeStyles, Theme} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {ClearOutlined} from "@material-ui/icons";
import {SelectLanguage} from "../SelectLanguage";
import {useSelector} from 'react-redux'
import {UserInfo} from "../UserInfo";
import strings from '../localization'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: "100%",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },

        clearIcon: {},
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        divSearch: {
            display: "flex",
            alignItems: "center",
        }
    }),
);

interface HeaderProps {
    changeHolder(newValue: string): void
}

const languageState = state => state.value.language;

export default function MainHeader({changeHolder}: HeaderProps) {
    const classes = useStyles();

    const inputRef = useRef(null);
    const language = useSelector(languageState);
    strings.setLanguage(language)

    const placeHolder = strings.search;


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <SelectLanguage/>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Travel app
                    </Typography>
                    <div className={classes.divSearch}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <div className={classes.search}>
                            <InputBase
                                ref={inputRef}
                                placeholder={placeHolder}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{'aria-label': 'search'}}
                                onChange={(event) => changeHolder(event.currentTarget.value)}
                            />
                        </div>
                        <div onClick={() => {
                            console.log(inputRef.current.firstChild);
                            changeHolder('');
                            inputRef.current.firstChild.value = '';
                        }}
                             className='clear-icon'
                        >
                            <ClearOutlined/>
                        </div>
                    </div>
                    <UserInfo/>

                </Toolbar>
            </AppBar>
        </div>
    );
}

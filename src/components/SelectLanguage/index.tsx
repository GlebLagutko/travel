import React from "react";
import {Translate} from "@material-ui/icons";
import {createStyles, makeStyles, MenuItem, Select, Theme} from "@material-ui/core";
import {useSelector, useDispatch} from 'react-redux';
import {CHANGE_LANGUAGE} from "../../store/actions/ChangeLanguage";
import {saveState} from "../../store/SaveState";
import store from "../../store";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                display: "flex",
                alignItems: "center",
                position: "absolute",
                top: '15px',
                left: '60px'
            }
        }
    )
);

const languageState = state => state.value.language;

export function SelectLanguage() {

    const language = useSelector(languageState);
    const dispatch = useDispatch();
    const classes = useStyles();


    function changeLanguageState(newLanguage) {
        dispatch({type: CHANGE_LANGUAGE, value: newLanguage});
        saveState(store);
    }


    return <div className={classes.root}>
        <Translate/>
        <Select
            value={language}
            displayEmpty
            inputProps={{'aria-label': 'Without label'}}
        >
            <MenuItem value={'en'} onClick={() => changeLanguageState('en')}>En</MenuItem>
            <MenuItem value={'ru'} onClick={() => changeLanguageState('ru')}>Ru</MenuItem>
            <MenuItem value={'de'} onClick={() => changeLanguageState('de')}>De</MenuItem>
        </Select>
    </div>
}

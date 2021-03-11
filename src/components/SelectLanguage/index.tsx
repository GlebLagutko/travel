import React from "react";
import {Translate} from "@material-ui/icons";
import {MenuItem, Select} from "@material-ui/core";
import {useSelector, useDispatch} from 'react-redux';
import {CHANGE_LANGUAGE} from "../../store/actions/ChangeLanguage";


const styles = {
    root: {
        display: "flex",
        alignItems: "center"
    }
}


const languageState = state => state.value.language;

export function SelectLanguage() {

    const language = useSelector(languageState);
    const dispatch = useDispatch();


    function changeLanguageState(newLanguage) {

       console.log(newLanguage)
        dispatch({type: CHANGE_LANGUAGE, value: newLanguage});
    }


    return (<div style={styles.root}>
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
    )
}

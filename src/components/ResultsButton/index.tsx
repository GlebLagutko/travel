import React from "react";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux'
import {CHANGE_RESULTS_SHOW} from "../../store/actions/ChangeResultsShow";
import strings from '../localization'

const langState = state => state.value.language;
const userState = state => state.value.user;

export function ResultsButton() {
    const dispatch = useDispatch();
    const language = useSelector(langState);
    const user = useSelector(userState);
    strings.setLanguage(language);

    return <Button disabled={false} variant="outlined"
                   onClick={() => dispatch({type: CHANGE_RESULTS_SHOW, value: true})}>
        {strings.other_users}
    </Button>
}

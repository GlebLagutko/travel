import React from "react";
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux'
import {CHANGE_SHOW} from "../../store/actions/ChangeShow";
import {CHANGE_VOTE} from "../../store/actions/ChangeVote";
import strings from '../localization'

const langState = state => state.value.language;
const userState = state => state.value.user;

export function ButtonVote() {
    const dispatch = useDispatch();
    const language = useSelector(langState);
    const user = useSelector(userState);
    strings.setLanguage(language);

    return <Button disabled={!user} variant="outlined" onClick={() => dispatch({type: CHANGE_VOTE, value: true})}>
        {strings.toVote}
    </Button>
}

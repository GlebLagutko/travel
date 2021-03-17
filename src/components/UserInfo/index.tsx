import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {CHANGE_SHOW} from "../../store/actions/ChangeShow";
import strings from '../localization'
import {CHANGE_SHOW_OUT} from "../../store/actions/ChangeShowOut";

const user = state => state.value.user;
const languageState = state => state.value.language;

export const UserInfo = (props) => {

    const currentUser = useSelector(user);
    const language = useSelector(languageState);
    const dispatch = useDispatch();
    strings.setLanguage(language);

    if (currentUser) {
        return <div className="user-info" onClick={() => dispatch({type: CHANGE_SHOW_OUT, value: true})}>
            <span>{currentUser.name + ' '} </span>
            <img src={`/${currentUser.fileName}`}
                 style={{width: '40px', height: "40px", borderRadius: '100%'}}/>
        </div>
    } else {
        return <div className='login' onClick={() => dispatch({type: CHANGE_SHOW, value: true})}>{
            strings.login
        }</div>

    }
};

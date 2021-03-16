import {CHANGE_LANGUAGE} from "../actions/ChangeLanguage";
import {CHANGE_COUNTRY} from "../actions/ChangeCountry";
import {CHANGE_SHOW} from "../actions/ChangeShow";
import {CHANGE_VOTE} from "../actions/ChangeVote";
import {USER_LOGGED_IN} from "../actions/UserLoggedIn";
import {CHANGE_RESULTS_SHOW} from "../actions/ChangeResultsShow";
import {USER_LOGGED_OUT} from "../actions/UserLoggedOut";
import {CHANGE_SHOW_OUT} from "../actions/ChangeShowOut";

const myReducer = (state: object = {}, action) => {

    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {...state, language: action.value};
        case CHANGE_COUNTRY:
            return {...state, country: action.value};
        case CHANGE_SHOW:
            return {...state, show: action.value};
        case CHANGE_SHOW_OUT:
            return {...state, showOut: action.value};
        case CHANGE_VOTE:
            return {...state, vote: action.value};
        case USER_LOGGED_IN:
            return {...state, user: action.value};
        case CHANGE_RESULTS_SHOW:
            return {...state, results: action.value};
        case USER_LOGGED_OUT:
            return {...state, user: null};
        default:
            return state;
    }
};

export {myReducer};

import {CHANGE_LANGUAGE} from "../actions/ChangeLanguage";
import {CHANGE_COUNTRY} from "../actions/ChangeCountry";

const myReducer = (state: object = {}, action) => {
    console.log("st" + state);

    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {...state, language: action.value};
        case CHANGE_COUNTRY:
            return {...state, country: action.value};
        default:
            return state;
    }
};

export {myReducer};

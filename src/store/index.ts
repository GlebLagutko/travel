import {createStore, combineReducers} from 'redux';
import {myReducer} from "./reducers/MyReducer";

const reducer = combineReducers({value: myReducer});


const initialState = JSON.parse(localStorage.getItem('state')) || {
    value: {
        country: "Norway",
        language: "ru"
    }
}

const store = createStore(reducer, initialState);

export default store;

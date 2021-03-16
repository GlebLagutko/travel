import {createStore, combineReducers} from 'redux';
import {myReducer} from "./reducers/MyReducer";

const reducer = combineReducers({value: myReducer});


const initialState = JSON.parse(localStorage.getItem('state')) || {
    value: {
        country: {urlName: "Main page", name: "Main page"},
        language: "en",
        show: false,
        vote: false,
        user: null,
        results:false,
        showOut:false
    }
};

const store = createStore(reducer, initialState);

export default store;

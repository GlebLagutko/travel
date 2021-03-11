import './App.css';

import React from 'react';
import CountryCard from "./components/CountryCard";
import {MainPage} from "./components/MainPage";

import {useSelector} from 'react-redux'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import {CountryPage} from "./components/CountryPage";
import {data} from "./data";


const languageState = state => state.language;
const countryState = state => state.value.country;

function App() {
    const country = useSelector(countryState);


    const pages = data.map(elem =>
        <Route exact path={`/${elem.title.toLowerCase()}`}><CountryPage country={elem.title}/></Route>);

    console.log(pages);


    return (
        <div className="App">
            <Switch>

                <Route exact path='/' component={MainPage}/>
                {
                    pages
                }


            </Switch>
        </div>
    );
}

export default App;

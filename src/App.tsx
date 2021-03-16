import './App.css';

import React from 'react';
import {MainPage} from "./components/MainPage";
import {LoadingSpinner} from './components/LoadingSpinner';

import {useSelector} from 'react-redux'

import {Link, Redirect, Route, Switch} from "react-router-dom";
import {CountryPage} from "./components/CountryPage";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Footer} from "./Footer";
import {ModalLogin} from "./components/ModalLogin/ModalLogin";
import {Login} from "./components/Login";
import {createUploadLink} from 'apollo-upload-client'
import {ModalLogou} from "./components/ModalLogout";


export const client = new ApolloClient({
    uri: "http://localhost:3020/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: 'http://localhost:3020/graphql',
    }),
});


const countryState = state => state.value.country;

function App() {
    const countryName = useSelector(countryState);

    const currentPage = countryName.urlName === 'Main page' ? <MainPage/> : <CountryPage/>;

    return (
        <div className='main-div'>
            <div className="App">
                <ApolloProvider client={client}>
                    {
                        currentPage
                    }
                    <ModalLogin/>
                    <ModalLogou/>
                </ApolloProvider>
                <LoadingSpinner/>

            </div>
            <Footer/>
        </div>
    );
}

export default App;

import './App.css';

import React from 'react';
import MainPage from "./components/MainPage";
import {LoadingSpinner} from './components/LoadingSpinner';

import {useSelector} from 'react-redux'

import {Link, Redirect, Route, Switch} from "react-router-dom";
import {CountryPage} from "./components/CountryPage";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import {ModalLogin} from "./components/ModalLogin/ModalLogin";
import {createUploadLink} from 'apollo-upload-client'
import ModalLogout from "./components/ModalLogout";
// @ts-ignore
import Footer from "./components/Footer";


export const client = new ApolloClient({
    uri: "https://gentle-ridge-12513.herokuapp.com/graphql",
    cache: new InMemoryCache(),
    link: createUploadLink({
        uri: 'https://gentle-ridge-12513.herokuapp.com/graphql',
    }),
});
// export const client = new ApolloClient({
//     uri: "https://gentle-ridge-12513.herokuapp.com/graphql",
//     cache: new InMemoryCache(),
//     link: createUploadLink({
//         uri: 'https://gentle-ridge-12513.herokuapp.com/graphql',
//     }),
// });


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
                    <ModalLogout/>
                </ApolloProvider>
                <LoadingSpinner/>

            </div>
            <Footer/>
        </div>
    );
}

export default App;

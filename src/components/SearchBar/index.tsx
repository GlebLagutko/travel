import React from 'react';
import {useSelector} from 'react-redux'

const languageState = state => state.value.language;

const SearchBar = ({setKeyword}) => {

    const language = useSelector(languageState);

    const BarStyling = {width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem"};
    return (
        <input
            style={BarStyling}
            key="random1"
            placeholder={language === "en" ? "Search" : language === "ru" ? "Поиск" : "Suche"}
            onChange={(event) => setKeyword(event.currentTarget.value)}
        />
    );
}

export default SearchBar

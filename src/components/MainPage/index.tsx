import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MainHeader from "../MainHeader";
import CountryCard from "../CountryCard";
import {CardContainer} from "../CardContainer";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
});


const currentCountryState: any = state => state.currentPage;

const languageState = state => state.value.language;

export function MainPage() {

    const styles = useStyles();


    const language = useSelector(languageState);
    const currentCountry: string = useSelector(currentCountryState);
    let [searchValue, setSearchValue] = useState('');

    function changeSearchValue(newValue: string): void {
        setSearchValue(newValue);
        console.log(searchValue);
    }


    return (<div className={styles.root}>
        <MainHeader changeHolder={changeSearchValue}/>
        <CardContainer searchValue={searchValue}/>
    </div>);
}


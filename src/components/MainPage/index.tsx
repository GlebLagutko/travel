import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MainHeader from "../MainHeader";
import CardContainer from "../CardContainer";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
});

export default function MainPage() {

    const styles = useStyles();

    let [searchValue, setSearchValue] = useState('');

    function changeSearchValue(newValue: string): void {
        setSearchValue(newValue);
    }

    return (<div className={styles.root}>
        <MainHeader changeHolder={changeSearchValue}/>
        <CardContainer searchValue={searchValue}/>
    </div>);
}


import React, {useEffect, useState} from "react";
import {data} from "../../data";
import CountryCard from "../CountryCard";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";


interface ContainerProps {
    searchValue: string;
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        maxWidth: "1200",
        columnGap:"30px",
        rowGap:"30px",
        margin:"50px 0px",
        minHeight:400,
    },
});




const languageState = state => state.value.language;

export function CardContainer({searchValue}: ContainerProps) {

    let [countries, setCountries] = useState([]);

    const language = useSelector(languageState);
    const cards = [];
    const styles = useStyles();

    useEffect(() => {
        setCountries(data);
    }, []);


    countries.forEach((elem) => {
        if (elem[language].country.toLowerCase().match(searchValue.toLowerCase()) || elem[language].capital.toLowerCase().match(searchValue.toLowerCase())) {
            cards.push(<CountryCard country={elem}/>);
        }
    });


    return (<div className={styles.root}>
        {
            cards
        }
    </div>)
}

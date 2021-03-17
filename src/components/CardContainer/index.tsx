import React, {useState} from "react";
import CountryCard from "../CountryCard";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {useQuery} from "@apollo/client";
import query from "./query";


interface ContainerProps {
    searchValue: string;
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        maxWidth: "1200",
        columnGap: "30px",
        rowGap: "30px",
        padding: "50px 0",
    },
});


const languageState = state => state.value.language;

export default function CardContainer({searchValue}: ContainerProps) {

    const [countries, setCountries] = useState([]);
    const language = useSelector(languageState);

    useQuery(query, {
        variables: {language: language},
        onCompleted: data => {
            setCountries(data["Countries"]);
        }
    });
    //
    const cards = [];


    countries.forEach((elem) => {
        let search = searchValue.toLowerCase();
        if (elem.name.toLowerCase().match(search) || elem.capital.toLowerCase().match(search)) {
            cards.push(<CountryCard country={elem} key={elem.id}/>);
        }
    });

    const styles = useStyles();
    return (<div className={styles.root}>
        {
            cards
        }
    </div>)
}

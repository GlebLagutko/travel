import React, {useState} from "react";
import CountryCard from "../CountryCard";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {gql, useQuery} from "@apollo/client";


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

export function CardContainer({searchValue}: ContainerProps) {

    const [countries, setCountries] = useState([]);
    const language = useSelector(languageState);

    const query = gql`
        query Countries($language: String!){
            Countries(language: $language){
                id
                name
                video
                urlName
                capital
            }
        }`;

    useQuery(query, {
        variables: {language: language},
        onCompleted: data => {
            setCountries(data["Countries"]);
            console.log(countries);
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

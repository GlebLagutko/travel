import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import CountryHeader from "../CountryHeader";
import {makeStyles} from "@material-ui/core/styles";
import WeatherWidget from "../WeatherWidget";
import {Slideshow} from "../AttractionsSlider";
import {CountryMap} from "../CountryMap";
import ExchangeWidget from "../ExchangeRates";
import DateWidget from "../DateWidget";
import ClockWidget from "../TimeWidget";

import {gql, useQuery} from "@apollo/client";
import VideoWidget from "../VideoWidget";
import {ButtonVote} from "../VoteButton";
import {VoteModal} from "../VoteModal";
import {ModalResults} from "../ModalResults";
import {ResultsButton} from "../ResultsButton";

const currentCountryState: any = state => state.currentPage;

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
    },
    firstSection: {
        width: "100%",
        minHeight: "500px",
        background: "center",
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",


    },
    secondSection: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "50px 0px 50px 0px ",
        background: 'linear-gradient(#6059f7,#6592fe)'


    },
    thirdSection: {
        width: "100%",
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0px",
        background: 'linear-gradient(#6592fe,#36c3fe)'

    },
    fourthSection: {
        width: "100%",
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0px",
        background: 'linear-gradient(#36c3fe,#8c61ff)'

    },

});

const countryState = state => state.value.country;
const languageState = state => state.value.language;
const showState = state => state.value.vote;


export function CountryPage() {
    const countryInfo = useSelector(countryState);
    const language = useSelector(languageState);
    const show = useSelector(showState);

    const styles = useStyles();

    const [country, setCountry] = useState(null);

    const query = gql`
        query CountryByNameAndLanguage($name: String!, $language: String!)
        {
            CountryByNameAndLanguage(name: $name, language: $language){
                id
                name
                video
                urlName
                capital
                description
                currency
                map
                image
                coordinates{
                    lon
                    lat
                }
                Attractions{
                    id
                    name
                    description
                    image
                    Votes{
                        id
                        rate
                        User{
                            id
                            name
                            fileName
                        }
                    }
                }

            }
        }`;


    const {refetch} = useQuery(query, {
        variables: {name: countryInfo.urlName, language: language},
        onCompleted: data => {
            console.log('========data=======');
            console.log(data);
            setCountry(data["CountryByNameAndLanguage"]);
            console.log(country);
        },
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
    });


    if (country == null)
        return <div/>
    else
        return (<div className={styles.root}>
            <CountryHeader country={country.name}/>
            <section className={styles.firstSection} style={{backgroundImage: `url(${country.image})`,}}>
                <div className="mainTextContainer">
                    <h1>{country.name}</h1>
                    <h3>{country.capital}</h3>
                    <div className="countryDescription">{country.description}</div>
                </div>
            </section>
            <section className={styles.secondSection}>
                <ButtonVote/>
                <ResultsButton/>
                <Slideshow attractions={country.Attractions}/>
            </section>
            <section className={styles.thirdSection}>
                <VideoWidget video={country.video}/>
            </section>
            <section className={styles.fourthSection}>
                <CountryMap country={country}/>
            </section>
            <WeatherWidget city={country.capital} cityCoordinates={country.coordinates}/>
            <ExchangeWidget country={country}/>
            <DateWidget country={country}/>
            <ClockWidget country={country}/>
            <VoteModal attractions={country.Attractions} refetchFunction={refetch}/>
            <ModalResults attractions={country.Attractions}/>
        </div>)
}


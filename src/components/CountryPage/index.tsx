import React from 'react'
import {useSelector} from 'react-redux'
import CountryHeader from "../CountryHeader";
import {makeStyles} from "@material-ui/core/styles";
import {data} from "../../data";
import {WeatherWidget} from "../WeatherWidget";
import {Slideshow} from "../AttractionsSlider";
import {CountryMap} from "../CountryMap";
import ExchangeWidget from "../ExchangeRates";
import DateWidget from "../DateWidget";
import {ClockWidget} from "../TimeWidget";


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
        backgroundSize: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"

    },
    secondSection: {
        width: "100%",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0px",
        background: "#CCFBFE"

    },
    thirdSection: {
        width: "100%",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0px",
        background: "#CDD6DD"

    },
    fourthSection: {
        width: "100%",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 0px",
        background: "#CDACA1"

    },

});


const languageState = state => state.value.language;

export function CountryPage({country}) {

    const styles = useStyles();


    const language = useSelector(languageState);
    const langObj = data.find(elem => elem.title === country);
    console.log('lan ' + language)
    console.log(langObj)

    const countryObject = langObj[language];

    console.log(countryObject)
    return (<div className={styles.root}>
        <CountryHeader/>
        <section className={styles.firstSection} style={{backgroundImage: `url(${countryObject.image})`,}}>
            <div className="mainTextContainer">
                <h1>{countryObject.country}</h1>
                <h3>{countryObject.capital}</h3>
                <div className="countryDescription">{countryObject.description}</div>
            </div>
        </section>
        <section className={styles.secondSection}>
            <Slideshow attractions={countryObject.attractions}/>
        </section>
        <section className={styles.thirdSection}>
            <iframe width="60%" height="362" src={countryObject.video} frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        </section>

        <section className={styles.fourthSection}>
            <CountryMap country={countryObject}/>
        </section>
        <WeatherWidget city={countryObject.capital} cityCoordinates={countryObject.coordinates}/>
        <ExchangeWidget country={countryObject}/>
        <DateWidget country={countryObject}/>
        <ClockWidget country={countryObject}/>
    </div>)
}


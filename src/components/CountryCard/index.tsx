import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import {CHANGE_COUNTRY} from "../../store/actions/ChangeCountry";
import {saveState} from "../../store/SaveState";
import store from "../../store";

const useStyles = makeStyles({
    root: {
        height: 300,
        width: 250
    },
    media: {
        height: 200,
    },
});


export default function CountryCard({country}) {
    const classes = useStyles();

    const dispatch = useDispatch();

    return (
        <Card className={classes.root} onClick={() => {
            dispatch({
                type: CHANGE_COUNTRY,
                value: {urlName: country.urlName, name: country.urlName[0].toUpperCase() + country.urlName.substr(2)},
            });
            saveState(store);
        }}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`assets/images/thumbnail-${country.urlName}.jpg`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {country.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {country.capital}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

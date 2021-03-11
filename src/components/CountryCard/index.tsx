import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const useStyles = makeStyles({
    root: {
        height: 300,
        width: 250
    },
    media: {
        height: 200,
    },
});


const languageState = state => state.value.language;

export default function CountryCard({country}) {
    const classes = useStyles();

    const language = useSelector(languageState);

    return (
        <Link to={`/${country.title.toLowerCase()}`} style={{textDecoration: "none"}}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`/assets/images/${country.title}.jpg`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {country[language].country}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {country[language].capital}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

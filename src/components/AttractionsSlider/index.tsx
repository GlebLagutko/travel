import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import SimpleImageSlider from "react-simple-image-slider";
import Slider from "react-slick";
import ImageGallery from 'react-image-gallery';
import 'react-slideshow-image/dist/styles.css'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const fadeImages = [
    'images/slide_5.jpg',
    'images/slide_6.jpg',
    'images/slide_7.jpg'
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: "300px",
            height: "300px",
            width: '70%'
        }
    }),
);

export const Slideshow = ({attractions}) => {

    const images = [];
    const classes = useStyles();

    attractions.forEach(elem =>
        images.push({
            original: elem.image,
            thumbnail: elem.image,
            description: elem.description,
            originalTitle: elem.name,
            thumbnailTitle: elem.name,
            thumbnailLabel: elem.name,
        }))


    let settings = {
        dots: true,
    };
    return <ImageGallery className={classes.root} items={images} autoPlay thumbnailPosition='bottom' showBullets
                         slideInterval={3000}/>;
}

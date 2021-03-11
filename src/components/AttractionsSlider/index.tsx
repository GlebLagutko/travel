import React from 'react';
import 'react-slideshow-image/dist/styles.css'
import ImageGallery from 'react-image-gallery';

const fadeImages = [
    'images/slide_5.jpg',
    'images/slide_6.jpg',
    'images/slide_7.jpg'
];

export const Slideshow = ({attractions}) => {

    const images = [];

    /*  attractions.forEach(elem => attractionsArray.push(<div style={{width: "100%", height: "auto"}}>
          <div style={{
              'backgroundImage': `url(${elem.image})`, width: "100%", height: "250px",
              backgroundRepeat: 'no-repeat',
              backgroundSize: "100%"
          }}>
              <span>{elem.name}</span>
          </div>
          <div style={{color: "black"}}>{elem.description}</div>
      </div>));*/

    attractions.forEach(elem => images.push({
        original: elem.image,
        thumbnail: elem.image,
        description:  elem.description,
        originalTitle: elem.name,
        thumbnailTitle: elem.name,
        thumbnailLabel: elem.name,
    }))


    let settings = {
        dots: true,
    };
    return <ImageGallery items={images} autoPlay thumbnailPosition='bottom' showBullets   slideInterval={3000}/>;
}

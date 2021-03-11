import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xlYmxhZ3V0a28xIiwiYSI6ImNrbTNid2s0dzA0NjEyb282MXRjcWkxZ3AifQ.nMh6pzF_AeQP5LYVbFYWDg';


const languageState = state => state.value.language;

export const CountryMap = ({country}) => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    const language = useSelector(languageState);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: `${country.map}`,
            center: [country.coordinates.lon, country.coordinates.lat],
            zoom: 1
        });


        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl());

        const marker = new mapboxgl.Marker()
            .setLngLat([country.coordinates.lon, country.coordinates.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h1>${country.capital}</h1>`))
            .addTo(map);


        map.on('load', () => {

            console.log(map.getStyle().layers);
            map.setLayoutProperty(`country-label`, 'text-field', [
                'get',
                'name_' + language
            ]);
            map.setLayoutProperty(`state-label`, 'text-field', [
                'get',
                'name_' + language
            ]);
            map.setLayoutProperty(`settlement-major-label`, 'text-field', [
                'get',
                'name_' + language
            ]);
            map.setLayoutProperty(`settlement-minor-label`, 'text-field', [
                'get',
                'name_' + language
            ]);
        })


        return () => map.remove();
    }, [language]);


    return (
        <div style={{width: "500px", height: "350px"}}>
            <div className="map-container" ref={mapContainer}/>
        </div>
    );
};

/*
export const CountryMap = ({country}) => {


    const position = [country.coordinates.lat, country.coordinates.lon];


    console.log("map " + language);
    console.log(`${language}_${"RU"}`);



    return (
        <MapContainer center={position} zoom={2} scrollWheelZoom={false} style={{width:"500px",height:"350px"}} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )


  /!*  return (<YMaps query={{lang: `${language}_${"RU"}`.toString()}}>
        <div>
            <Map defaultState={{center: [country.coordinates.lat, country.coordinates.lon], zoom: 2}}>
                <Placemark geometry={[country.coordinates.lat, country.coordinates.lon]}/>
                <FullscreenControl/>
                <ZoomControl/>
            </Map>
        </div>
    </YMaps>)*!/
};
*/

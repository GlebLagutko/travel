import React, {useEffect, useRef, useState} from 'react';
import {YMaps, Map, Placemark, FullscreenControl, ZoomControl, Panorama, Polygon, Polyline} from 'react-yandex-maps';
import {useSelector} from 'react-redux'
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

mapboxgl.workerClass = MapboxWorker;

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xlYmxhZ3V0a28xIiwiYSI6ImNrbTNid2s0dzA0NjEyb282MXRjcWkxZ3AifQ.nMh6pzF_AeQP5LYVbFYWDg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: "300px",
            height: "300px",
            width: '70%',
            maxWidth:"1000px"
        }


    }),
);

const languageState = state => state.value.language;


export const CountryMap = ({country}) => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const classes = useStyles();

    const language = useSelector(languageState);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: `${country.map}`,
            center: [country.coordinates.lon, country.coordinates.lat],
            zoom: 2
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
        <div className={classes.root}>
            <div className="map-container" ref={mapContainer}/>
        </div>
    );
};


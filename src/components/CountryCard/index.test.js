import {create} from 'react-test-renderer';

import React from "react";
import CountryCard from ".";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

describe('CountryCard', () => {
  it('renders correctly', async () => {

    const initialState = {value: {language: "en"}};
    const mockStore = configureStore();
    let store = mockStore(initialState);

    let country = {
        "id": 1,
        "name": "Norway",
        "video": "https://www.youtube.com/embed/Scxs7L0vhZ4",
        "urlName": "norway",
        "capital": "Oslo",
        "description": "Norway, country of northern Europe that occupies the westernhalf of the Scandinavian peninsula. Nearly half of the inhabitants of the country live in the far south, in the region around Oslo, the capital. About two-thirds of Norway is mountainous, and off its much-indented coastline lie, carved by deep glacial fjords, some 50,000 islands.",
        "currency": "NOK",
        "map": "mapbox://styles/gleblagutko1/ckm3hgeoeb04a17qp1zl3qhx6",
        "image": "assets/images/norway.jpg",
        "coordinates": {
          "lon": 10.757933,
          "lat": 59.911491
        },
        "Attractions": [
          {
            "id": 19,
            "name": "Sognefjord",
            "description": "The largest of Norway's fjords, Sognefjord reaches 204 kilometers inland from the coastal village of Skjolden and branches off into countless smaller inlets and fjords along the way.",
            "image": "/assets/images/norway/sognefjord.jpg",
            "Votes": []
          }
        ]
      }
    ;

    const testRenderer = create(
      <Provider store={store}><CountryCard country={country} key={country.id}/></Provider>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

  });

});
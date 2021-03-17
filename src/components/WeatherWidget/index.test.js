import {render} from '@testing-library/react';

import WeatherWidget from '.';
import React from "react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'


describe('ExchangeWidget', () => {

  const response = {
    "coord": {"lon": 10.7461, "lat": 59.9127},
    "weather": [{"id": 800, "main": "Clear", "description": "clear sky", "icon": "01d"}],
    "base": "stations",
    "main": {"temp": 0.99, "feels_like": -4.88, "temp_min": 0, "temp_max": 1.67, "pressure": 1025, "humidity": 47},
    "visibility": 10000,
    "wind": {"speed": 4.12, "deg": 10},
    "clouds": {"all": 0},
    "dt": 1615974029,
    "sys": {"type": 1, "id": 1624, "country": "NO", "sunrise": 1615958854, "sunset": 1616001791},
    "timezone": 3600,
    "id": 3143244,
    "name": "Oslo",
    "cod": 200
  };

  const server = setupServer(
    rest.get('https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=da9c9689fa19ac3ed3a29bbd3670acdc&lang=en&units=metric', (req, res, ctx) => {
      return res(ctx.json(response))
    }),
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  it('renders correctly', async () => {

    const initialState = {value: {language: "en"}};
    const mockStore = configureStore();
    let store = mockStore(initialState);

    const {container, findByText} = render(
        <Provider store={store}><WeatherWidget city="Oslo"/></Provider>
    );

    expect(await findByText("clear sky")).toBeInTheDocument();
    expect(container).toMatchSnapshot();

  });
});
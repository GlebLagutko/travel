import {render} from '@testing-library/react';

import React from "react";
import CardContainer from ".";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
import {MockedProvider} from '@apollo/client/testing';
import query from "./query";

describe('CardContainer', () => {
  it('renders correctly', async () => {

    const initialState = {value: {language: "en"}};
    const mockStore = configureStore();
    let store = mockStore(initialState);

    const mocks = [
      {
        request: {
          query: query,
          variables: {
            language: 'en',
          },
        },
        result: {
          data: {
            "Countries": [
              {
                "id": 1,
                "name": "Norway",
                "video": "https://www.youtube.com/embed/Scxs7L0vhZ4",
                "urlName": "norway",
                "capital": "Oslo"
              }
            ]
          }
        },
      }
    ];

    const {container, findByText} = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Provider store={store}><CardContainer searchValue=""/></Provider>
        </MockedProvider>, );

    expect(await findByText("Norway")).toBeInTheDocument();
    expect(container).toMatchSnapshot();

  });

});
import {act, create} from 'react-test-renderer';

import React from "react";
import CountryHeader from ".";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

describe('CountryHeader', () => {
  it('renders correctly', async () => {

    const initialState = {value: {language: "en"}};
    const mockStore = configureStore();
    let store = mockStore(initialState);

    const testRenderer = create(
      <Provider store={store}><CountryHeader/></Provider>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

  });

});
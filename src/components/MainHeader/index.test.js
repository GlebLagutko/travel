import {create} from 'react-test-renderer';

import React from "react";
import MainHeader from ".";
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'

describe('MainHeader', () => {
  it('renders correctly', async () => {

    const initialState = {value: {language: "en"}};
    const mockStore = configureStore();
    let store = mockStore(initialState);

    const testRenderer = create(
      <Provider store={store}><MainHeader/></Provider>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

  });

});
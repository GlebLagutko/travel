import {create} from 'react-test-renderer';

import React from "react";
import ClockWidget from ".";

describe('ClockWidget', () => {
  it('renders correctly', async () => {


    let country = {
        id: 1,
        timezone: "Europe/Oslo"
      }
    ;

    const testRenderer = create(
      <ClockWidget country={country}/>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

  });

});
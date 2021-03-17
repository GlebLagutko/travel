import {create} from 'react-test-renderer';

import React from "react";
import VideoWidget from ".";

describe('VideoWidget', () => {
  it('renders correctly', async () => {


    const testRenderer = create(
      <VideoWidget video="http://test.vodeo"/>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

  });

});
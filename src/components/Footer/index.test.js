import {create} from 'react-test-renderer';

import React from "react";
import Footer from "./index";

describe('Footer', () => {
  it('renders correctly', async () => {

    const testRenderer = create(
      <Footer/>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();

  });

});

import {render} from '@testing-library/react';

import ExchangeWidget from '.';
import React from "react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'

describe('ExchangeWidget', () => {

  const response ={
    result: "success",
    documentation: "https://www.exchangerate-api.com/docs",
    terms_of_use: "https://www.exchangerate-api.com/terms",
    time_last_update_unix: 1615852801,
    time_last_update_utc: "Tue, 16 Mar 2021 00:00:01 +0000",
    time_next_update_unix: 1615939216,
    time_next_update_utc: "Wed, 17 Mar 2021 00:00:16 +0000",
    base_code: "NOK",
    conversion_rates: {
      BYN: 10,
      USD: 0.1182,
      EUR: 0.09916,
    }
  };

  const server = setupServer(
    rest.get('https://v6.exchangerate-api.com/v6/3402d928822e13d5d341634b/latest/NOK', (req, res, ctx) => {
      return res(ctx.json(response))
    }),
  );

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  let country = {
      "id": 1,
      "currency": "NOK",
    }
  ;

  it('renders correctly', async () => {

    const {container, findByText} = render(<ExchangeWidget country={country} />);

    expect(await findByText("10")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
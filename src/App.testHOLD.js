import { render, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import nock from 'nock';

// needed for nock to work with axios
axios.defaults.adapter = require('axios/lib/adapters/http')

beforeEach(() => {
  nock.cleanAll();
})

it('should render loading when the user list is loading', async () => {
  nock('https://untitled-lg51povwrnr7.runkit.sh')
  .get(/.*/)
  .reply(400, {message: 'mock error occurred'});

  const { getByTestId } = render(<App />);

  const appLoading = await waitFor(() => getByTestId('app-loading'), {timeout: 3000});
  await waitFor(() => getByTestId('app-error'), {timeout: 3000});

  expect(appLoading).toHaveTextContent('Loading users...');
});

it('should render an error when the api call fails', async () => {
  nock('https://untitled-lg51povwrnr7.runkit.sh')
  .get(/.*/)
  .reply(400, {message: 'mock error occurred'});

  const { getByTestId } = render(<App />);

  const appError = await waitFor(() => getByTestId('app-error'), {timeout: 3000});

  expect(appError).toHaveTextContent(/^Error: Request failed with status code 400.*/);
});

it('should render the user list when the api returns a list of users', async () => {
  nock('https://untitled-lg51povwrnr7.runkit.sh')
  .get(/.*/)
  .reply(200, [
    {
      id:'1',
      firstName: 'Joey',
      lastName: 'Jiron',
      image: 'https://myimage.com',
    }
  ]);

  const { getAllByTestId } = render(<App />);

  const userListItems = await waitFor(() => getAllByTestId('user-list-item'), {timeout: 3000});


  expect(userListItems).toHaveLength(1);
  expect(userListItems[0]).toHaveTextContent('Joey Jiron')
});
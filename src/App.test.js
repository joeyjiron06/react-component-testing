import { render, waitFor, getByTestId } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import nock from 'nock';


function mockGetUsersApi(...args) {
  return nock('https://untitled-lg51povwrnr7.runkit.sh')
  .get(/.*/)
  .reply(...args);
}

// page object
function renderApp() {
  const app = render(<App />);

  app.waitForError = () =>  waitFor(() => app.getByTestId('app-error'), {timeout: 3000});

  app.getUserList = async () => {
    const userListItems = await waitFor(() => app.getAllByTestId('user-list-item'), {timeout: 3000});
    return userListItems.map(userListItemEl => ({
      getName() {
        return ''
      },
      getImage() {
        const image = getByTestId(userListItemEl, 'user-list-item-image');
        return image.src;
      }
    }))

  }

  

  return app;
}

// needed for nock to work with axios
axios.defaults.adapter = require('axios/lib/adapters/http')

beforeEach(() => {
  nock.cleanAll();
})

it('should render loading when the user list is loading', async () => {
  mockGetUsersApi(400, {message: 'mock error occurred'});

  const { getByTestId } = render(<App />);

  const appLoading = await waitFor(() => getByTestId('app-loading'), {timeout: 3000});
  await waitFor(() => getByTestId('app-error'), {timeout: 3000});

  expect(appLoading).toHaveTextContent('Loading users...');
});

it('should render an error when the api call fails', async () => {
  mockGetUsersApi(400, {message: 'mock error occurred'});

  const { waitForError } = renderApp();

  const errorEl = await waitForError();

  expect(errorEl).toHaveTextContent(/^Error: Request failed with status code 400.*/);
});

it('should render the user list when the api returns a list of users', async () => {
  mockGetUsersApi(200, [
    {
      id:'1',
      firstName: 'Joey',
      lastName: 'Jiron',
      image: 'https://myimage.com/',
    }
  ]);

  const { getUserList } = renderApp();

  const userListItems = await getUserList();


  expect(userListItems).toHaveLength(1);
  expect(userListItems[0].getImage()).toBe('https://myimage.com/');
});

it.skip('should render "no users" when the api returns an empty list', async () => {});
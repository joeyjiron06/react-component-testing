import { render, fireEvent } from '@testing-library/react';
import UserListItem from './userListItem';


describe('<UserListItem />', () => {
  it('should render the image when a user has an image', async () => {
    const user = {
      id : '1',
      firstName: 'Joey',
      lastName: 'Jiron',
      image: 'https://image.com/',
      phone: '123445566'
    }

    const { getByTestId } = render(<UserListItem user={user}/>);

    const imageEl = getByTestId('user-list-item-image');

    expect(imageEl).toHaveProperty('src', user.image);
  });
  
  it('should render the users full name when a user has a first and last name', async () => {
    const user = {
      id : '1',
      firstName: 'Joey',
      lastName: 'Jiron',
      image: 'https://image.com/',
      phone: '123445566'
    }

    const { getByText } = render(<UserListItem user={user}/>);

    const nameEl = getByText(`${user.firstName} ${user.lastName}`);

    expect(nameEl).toBeInTheDocument();
  });
  
  it('should invoke onMailClicked when a user clicks the mail button', async () => {
    const user = {
      id : '1',
      firstName: 'Joey',
      lastName: 'Jiron',
      image: 'https://image.com/',
      phone: '123445566'
    };
    const onMailClicked = jest.fn();

    const {getByTestId} = render(<UserListItem user={user} onMailClicked={onMailClicked} />);

    fireEvent.click(getByTestId('user-list-item-mail-button'))

    expect(onMailClicked).toHaveBeenCalledTimes(1);
  });
  
  it.skip('should invoke onPhoneClicked when a user clicks the mail button', async () => {});
});


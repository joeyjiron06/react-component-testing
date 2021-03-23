import React, {useState, useEffect} from 'react';
import UserList from './components/userList';
import {fetchUsers} from './api/users'
import './App.css';

const styles = {
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 10
  },
  userList: {
    margin: 'auto'
  }
}

function App() {
  const [modal, setModal] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState(null);


  useEffect(() => {
    async function load() {
      try {
        setError(null);
        setIsLoading(true);
        setUsers(null);
        
        const fetchedUsers = await fetchUsers();
        
        setUsers(fetchedUsers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.stack);
      }
    }

    load();
  }, [])



  function onMailClicked(user) {
    setModal({
      title: `${user.firstName}'s email`,
      subtitle: user.email,
    })
  }

  function onPhoneClicked(user) {
    setModal({
      title: `${user.firstName}'s phone number`,
      subtitle: user.phone,
    })
  }

  return (
    <div className="App">
    {modal && (
      <div style={styles.modal} onClick={() => setModal(null)}>
        <div style={styles.modalContent}>
          <div>{modal.title}</div>
          <div>{modal.subtitle}</div>
        </div>
      </div>
      )
    }

      {isLoading && (<div data-testid='app-loading'>Loading users...</div>)}
      {error && (<div data-testid='app-error'>{error}</div>)}
      {users && <UserList data-testid='app-user-list' users={users} onMailClicked={onMailClicked} onPhoneClicked={onPhoneClicked} style={styles.userList} /> }
    </div>
  );
}

export default App;

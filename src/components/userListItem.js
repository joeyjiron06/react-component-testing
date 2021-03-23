import React from 'react';
import { Mail, Phone } from 'react-feather';

const styles = {
  userListItem: {
    borderBottom: 'solid 1px rgb(30,30,30)',
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 20
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  actionButton: {
    cursor: 'pointer',
    color: 'rgba(0,0,0,0.6)',
    width: 20,
    height: 20,
    marginLeft: 20
  }
};

function UserListItem({user, onMailClicked, onPhoneClicked, ...props}) {
  return (
    <div {...props} style={{...styles.userListItem, ...props.styles}}>
      <div style={styles.userContainer}>
        <img src={user.image} alt="avatar" style={styles.image} />
        <span>{user.firstName + ' ' + user.lastName}</span>
      </div>

      <div style={styles.actionButtons}>
        <Mail style={styles.actionButton} onClick={onMailClicked}/>
        <Phone style={styles.actionButton} onClick={onPhoneClicked}/>
      </div>
    </div>
  );
} 

export default UserListItem;
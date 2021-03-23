import React from 'react';
import UserListItem from './userListItem';

const styles = {
  userList: {
    maxWidth: 500
  }
}

export default function UserList({users, onMailClicked, onPhoneClicked, ...props}) {
  return (
    <div {...props} style={{...styles.userList, ...props.style}}>
      {users && (users.map(user => <UserListItem user={user} key={user.id} 
        onMailClicked={() => onMailClicked(user)} onPhoneClicked={() => onPhoneClicked(user)}
      />))}
    </div>
  );
} 

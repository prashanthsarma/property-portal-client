import React from 'react';
import { API } from '../../../api';


export function Search() {

  const onCurrentUser = async () => {
    const response = await API.auth.CurrentUser();
    console.log(response);
  }
  return (
    <div>
      <p>
        Check out the following properties
    </p>
      <button onClick={onCurrentUser}>Get Current User</button>
    </div>
  );
}
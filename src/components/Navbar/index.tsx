import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { selectSignInStatus, signOut } from '../../reducers/login';
import { useSelector, useDispatch } from 'react-redux';
import { SignInStatus } from '../../reducers/login/interfaces';

export const Navbar = (props: any) => {
  const signInStatus = useSelector(selectSignInStatus);
  const dispatch = useDispatch();

  let history = useHistory();
  const gotoLogin = () => {
    history.push('/login');
  }

  const onSignOutClicked = async () => {
    dispatch(signOut())
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Property Portal</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/" >Home</Link>
          </li>
          {signInStatus === SignInStatus.SignedIn ?
            <li className="nav-item">
              <Link className="nav-link" to="/listings">My Listings</Link>
            </li>
            : null}
        </ul>
        <div className="navbar-item ml-auto" >
          {signInStatus === SignInStatus.SignedIn
            ? <button onClick={onSignOutClicked}>
              Sign Out
        </button>
            :
            <button onClick={gotoLogin}>
              Sign In
        </button>
          }
        </div>
      </div>
    </nav >
  );
}

import React, { useEffect, useCallback } from 'react';
import { useHistory, Link } from "react-router-dom";
import { selectSignInStatus, signOut, fetchCurrentUser, selectCurrentUser } from '../../reducers/login';
import { useSelector, useDispatch } from 'react-redux';
import { SignInStatus } from '../../reducers/login/interfaces';

export const Navbar = (props: any) => {
  const signInStatus = useSelector(selectSignInStatus);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  let history = useHistory();

  const stableDispatch = useCallback(dispatch, [])
  const gotoLogin = () => {
    history.push('/login');
  }

  const onSignOutClicked = async () => {
    dispatch(signOut())
  }
  useEffect(() => {
    stableDispatch(fetchCurrentUser())
  }, [stableDispatch])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">Property Portal</span>
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
            ? <div className="d-flex justify-content-between">
              <p className="m-0 mr-2">{`Logged in as ${currentUser!.email}`}</p>
              <button onClick={onSignOutClicked}>
                Sign Out
        </button>
            </div>
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

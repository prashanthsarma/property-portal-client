import React, { useEffect, useCallback } from 'react';
import { useHistory, Link } from "react-router-dom";
import { selectSignInStatus, signOut, fetchCurrentUser, selectCurrentUser } from '../../reducers/login';
import { useSelector, useDispatch } from 'react-redux';
import { SignInStatus } from '../../reducers/login/interfaces';
import { LoginMode } from '@prashanthsarma/property-portal-common';
import { useGoogleLogout } from 'react-google-login';
import GoogleButton from 'react-google-button'
import styles from './Navbar.module.css'
import { CurrentConfig } from '../../config';


export const Navbar = () => {
  const signInStatus = useSelector(selectSignInStatus);
  const currentUser = useSelector(selectCurrentUser);
  const { loaded, signOut: googleSignOut } = useGoogleLogout({
    clientId: CurrentConfig.GOOG_CLIENT,
    onLogoutSuccess: () => dispatch(signOut())
  })

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

  const renderSignOutButton = () => {
    switch (currentUser!.loginMode) {
      case LoginMode.gmail: {
        return (
          <>
            {loaded
              ? <GoogleButton
                className={styles.LogoutStyle}
                // type="light"
                label="Sign out"
                onClick={() => googleSignOut()} />
              : null
            }
          </>
        )
      }
      case LoginMode.manual:
      default: {
        return (
          <button className="btn btn-primary" onClick={onSignOutClicked}>
            {`Sign Out`}
          </button>
        )
      }

    }
  }



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
              <Link className="nav-link" to="/listings">My Properties</Link>
            </li>
            : null}
        </ul>
        <div className="navbar-item ml-auto" >
          {signInStatus === SignInStatus.SignedIn
            ?
            <div className="align-items-center d-flex flex-row-reverse">
              {renderSignOutButton()}
              <p className="m-0 mr-2">{`${currentUser!.email}`}</p>
            </div>
            :
            <button className="btn btn-outline-primary" onClick={gotoLogin}>
              {`Sign In`}
            </button>
          }
        </div>
      </div>
    </nav >
  );
}

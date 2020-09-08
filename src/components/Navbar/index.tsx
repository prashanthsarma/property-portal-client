import React, { useEffect, useCallback } from 'react';
import { useHistory, Link } from "react-router-dom";
import { selectSignInStatus, signOut, fetchCurrentUser, selectCurrentUser } from '../../reducers/login';
import { useSelector, useDispatch } from 'react-redux';
import { SignInStatus } from '../../reducers/login/interfaces';
import { LoginMode } from '@prashanthsarma/property-portal-common';
import { useGoogleLogout } from 'react-google-login';
import GoogleButton from 'react-google-button'
import styles from './Navbar.module.css'


export const Navbar = () => {
  const signInStatus = useSelector(selectSignInStatus);
  const currentUser = useSelector(selectCurrentUser);
  const { loaded, signOut: googleSignOut } = useGoogleLogout({
    clientId: "55275377596-hmrom5kugl9c3n9dk6oc4ftk94qh5umi.apps.googleusercontent.com",
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
                type="light"
                label="Logout"
                onClick={() => googleSignOut()} />
              : null
            }
          </>
        )
      }
      case LoginMode.manual:
      default: {
        return (
          <button onClick={onSignOutClicked}>
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
              <Link className="nav-link" to="/listings">My Listings</Link>
            </li>
            : null}
        </ul>
        <div className="navbar-item ml-auto" >
          {signInStatus === SignInStatus.SignedIn
            ?
            <div className="d-flex justify-content-between align-items-center">
              <p className="m-0 mr-2">{`Logged in as ${currentUser!.email}`}</p>
              {renderSignOutButton()}
            </div>
            :
            <button onClick={gotoLogin}>
              {`Sign In`}
            </button>
          }
        </div>
      </div>
    </nav >
  );
}

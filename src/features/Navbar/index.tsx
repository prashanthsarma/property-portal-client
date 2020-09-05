import React from 'react';
import { useHistory, Link } from "react-router-dom";
import { selectSignInStatus, signOut } from '../login/slice';
import { useSelector, useDispatch } from 'react-redux';
import { SignInStatus } from '../login/slice/interfaces';

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
          <li className="nav-item">
            <Link className="nav-link" to="/listings">My Listings</Link>
          </li>
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

// export const Navbar = withRouter(NavbarI);
import React, { ReactNode } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSignInStatus } from '../../reducers/login';
import { SignInStatus } from '../../reducers/login/interfaces';


const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
  const signInStatus = useSelector(selectSignInStatus);
  return (
    <Route {...rest} render={
      props => {
        if (signInStatus === SignInStatus.SignedIn) {
          return children;
        } else {
          return <p>Unauthorized</p>
        }
      }
    } />
  )
}

export default ProtectedRoute;
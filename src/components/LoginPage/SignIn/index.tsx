import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { signIn, selectSignInStatus, signUp, selectSignInError, verifyGoogleToken } from '../../../reducers/login'
import { SignInStatus } from '../../../reducers/login/interfaces';
import { Redirect } from 'react-router-dom'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { CurrentConfig } from '../../../config';

export function SignIn() {
  const signInStatus = useSelector(selectSignInStatus);
  const [values, setValues] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const signInError = useSelector(selectSignInError);

  if (signInStatus === SignInStatus.SignedIn) {
    return <Redirect
      to={{
        pathname: "/",
      }}
    />
  }

  const onSignInClicked = () => {
    dispatch(signIn(values))
  }

  const onSignUpClicked = () => {
    dispatch(signUp(values))
  }

  const onGoogleResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const onlineResp = response as GoogleLoginResponse
    if (onlineResp) {
      console.log(onlineResp.tokenId)
      dispatch(verifyGoogleToken({ idToken: onlineResp.tokenId }))
    }
  }

  return (
    <div>
      <form>
        <div className="form-row">
          <label>Email</label>
          <input
            data-testid="signin-email"
            className="form-control"
            name="email"
            type="email"
            required
            value={values.email}
            onChange={setValues}>
          </input>
        </div>
        <div className="form-row">
          <label>Password</label>
          <input
            data-testid="signin-password"
            className="form-control"
            name="password"
            type="password"
            required
            minLength={4}
            maxLength={20}
            value={values.password}
            onChange={setValues}>
          </input>
        </div>
        <div className="align-self-center mb-4">
          <button className="m-2 btn btn-primary" type="submit" onClick={onSignInClicked} value="signIn">Sign In</button>
          <button className="m-2 btn btn-secondary" type="submit" onClick={onSignUpClicked} value="signUp">Sign Up</button>
        </div>
        <p >{signInError}</p>
      </form>
      <GoogleLogin
        clientId={CurrentConfig.GOOG_CLIENT}
        onSuccess={onGoogleResponse}
        onFailure={() => { }}
        isSignedIn={true}
      />
    </div>
  );
}

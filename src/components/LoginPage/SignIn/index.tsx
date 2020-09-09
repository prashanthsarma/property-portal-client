import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { signIn, selectSignInStatus, signUp, selectSignInError, verifyGoogleToken } from '../../../reducers/login'
import { SignInStatus } from '../../../reducers/login/interfaces';
import { Redirect } from 'react-router-dom'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'

export function SignIn() {
  const [values, setValues] = useForm({ email: '', password: '' });
  const dispatch = useDispatch();
  const signInStatus = useSelector(selectSignInStatus);
  const signInError = useSelector(selectSignInError);

  const onSignInClicked = async () => {
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

  if (signInStatus === SignInStatus.SignedIn) {
    return <Redirect
      to={{
        pathname: "/",
      }}
    />
  }

  return (
    <div>
      <div className="form-row">
        <label>Email</label>
        <input
          data-testid="signin-email"
          className="form-control"
          name="email"
          type="email"
          required
          minLength={1}
          maxLength={25}
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
      <div className="align-self-center">
        <button className="m-2" onClick={onSignInClicked}>Sign In</button>
        <button className="m-2" onClick={onSignUpClicked}>Sign Up</button>
      </div>
      <GoogleLogin
        // Should move to config
        clientId="55275377596-hmrom5kugl9c3n9dk6oc4ftk94qh5umi.apps.googleusercontent.com"
        onSuccess={onGoogleResponse}
        onFailure={() => {}}
        isSignedIn={true}
      />

      <p >{signInError}</p>

    </div>
  );
}

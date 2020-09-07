import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { signIn, selectSignInStatus, signUp, selectSignInError } from '../../../reducers/login'
import { SignInStatus } from '../../../reducers/login/interfaces';
import { Redirect } from 'react-router-dom'
import styles from './SignIn.module.css';


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


  if (signInStatus === SignInStatus.SignedIn) {
    return <Redirect
      to={{
        pathname: "/",
      }}
    />
  }

  return (
    <div className={styles.signinContainer}>
      <div className="m-2 align-items-baseline d-flex flex-column">
        <label>Email</label>
        <input
          data-testid="signin-email"
          name="email"
          type="email"
          required
          minLength={1}
          maxLength={25}
          value={values.email}
          onChange={setValues}>
        </input>
      </div>
      <div className="m-2 align-items-baseline d-flex flex-column">
        <label>Password</label>
        <input
          data-testid="signin-password"
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

      <p >{signInError}</p>

    </div>
  );
}

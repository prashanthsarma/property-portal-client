import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { signIn, selectSignInStatus, signUp, selectSignInError } from '../slice'
import { SignInStatus } from '../slice/interfaces';
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
      <div>
        <button onClick={onSignInClicked}>Sign In</button>
        <button onClick={onSignUpClicked}>Sign Up</button>
      </div>
      <div>
        <p>{signInError}</p>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './LoginPage.module.css';
import { SignIn } from './SignIn';

export function LoginPage() {
  return (
    <div className={`${styles.loginContainer} align-items-center d-flex container-fluid`}>
      <div className="flex-column-reverse flex-sm-row row">
        <div className="col-sm-6 col-12 border-right mt-4">
          <h2>The Property Portal</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
        </div>
        <div className="col-sm-6 col-12 d-flex align-items-center justify-content-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
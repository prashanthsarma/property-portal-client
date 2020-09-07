import { ISignInResponse } from "@prashanthsarma/property-portal-common";

export interface LoginState {
    currentUser: ISignInResponse | null;
    signInError: string
    signInStatus : SignInStatus
}

export enum SignInStatus {
    SignedIn,
    SignedOut,
    TryingSignIn,
    TryingSignOut
}

export interface ISignInData {
    email: string;
    password: string;
}  
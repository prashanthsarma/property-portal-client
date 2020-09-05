export interface LoginState {
    currentUser: any;
    signInError: string
    signInStatus : SignInStatus
}

export enum SignInStatus {
    SignedIn,
    SignedOut,
    TryingSignIn
}

export interface ISignInData {
    email: string;
    password: string;
}  
import { BaseService, MethodType } from "../BaseService"
import { CurrentConfig } from "../../config/config"
import {
  ISignInRequestBody, ISignInResponse, IUserIdResolveBody, IVerifyGoogleTokenRequestBody
} from "@prashanthsarma/property-portal-common"


export class AuthService extends BaseService {
  private AUTH_URL = CurrentConfig.AUTH_URL || `${CurrentConfig.BASE_URL}/users`

  public async SignIn(body: ISignInRequestBody) {
    const signInUrl = `${this.AUTH_URL}/signin`;
    const resp = await this.callAPI<ISignInResponse, ISignInRequestBody>(signInUrl, MethodType.POST, body, null);
    return resp;
  }

  public async SignUp(body: ISignInRequestBody) {
    const signInUrl = `${this.AUTH_URL}/signup`;
    const resp = await this.callAPI<ISignInResponse, ISignInRequestBody>(signInUrl, MethodType.POST, body, null);
    return resp;
  }

  public async SignOut() {
    const signOutUrl = `${this.AUTH_URL}/signOut`;
    const resp = await this.callAPI<{}, null>(signOutUrl, MethodType.POST, null, null);
    return resp;
  }

  public async CurrentUser() {
    const currentUserUrl = `${this.AUTH_URL}/currentuser`;
    return await this.callAPI<ISignInResponse | "", null>(currentUserUrl, MethodType.GET, null, null);
  }

  public async ResolveUsers(body: IUserIdResolveBody) {
    const url = `${this.AUTH_URL}/resolve`;
    return await this.callAPI<ISignInResponse[], IUserIdResolveBody>(url, MethodType.POST, body, null);
  }

  public async verifyGoogleToken(body: IVerifyGoogleTokenRequestBody) {
    const url = `${this.AUTH_URL}/verifyGoogleToken`;
    const resp = await this.callAPI<ISignInResponse, IVerifyGoogleTokenRequestBody>(url, MethodType.POST, body, null);
    return resp;
  }
}
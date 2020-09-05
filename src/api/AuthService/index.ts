import { BaseService, MethodType } from "../BaseService"
import { CurrentConfig } from "../../config/config"

interface ISignInRequestBody {
  email: string;
  password: string;
}

interface ISignInResponse {
  email: string;
  id: string;
}


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


  public async CurrentUser(){
    const currentUserUrl = `${this.AUTH_URL}/currentuser`;
    await this.callAPI(currentUserUrl, MethodType.GET, null, null);
  }
}
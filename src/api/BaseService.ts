import { AxiosError } from "axios";
import { default as axios } from 'axios';
export interface IErrorObject {
  message: string; field?: string
}

export enum MethodType {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export class BaseService {

  constructor() {

  }


  protected async callAPI<Resp, Req>(url: string, method: MethodType, body: Req, headers: any) {
    let data = null;
    let error = '';
    try {
      const resp = await axios({
        headers,
        method,
        url,
        data: body,
        withCredentials:true
      });
      data = resp.data
      
    }
    catch (e) {
      error = this.handleError(e)
    }
    return {data: data as Resp, error}  ;
  }

  protected handleError(e: AxiosError<{ errors: IErrorObject[] }>) {
    // handle error
    const err = e;
    let error = '';
    if (err.response != null && err.response!.status === 401) {
      error = this.displayError("Authentication failed")
      // Resend for a refresh token here and call the same api again
    }
    else {
      if (err.response != null) {
        error = this.displayError(err.response.data.errors[0].message )
      }
      else {
        error = this.displayError(err.message)
      }
    }
    return error;
  }

  protected displayError(message: string) {
    // We can have an alert service here to display
    // error or allow the API consumer to show the error
    console.log(message);
    return message
  }
}
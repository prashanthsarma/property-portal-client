import { BaseService, MethodType } from "../BaseService"
import { CurrentConfig } from "../../config/config"
import  {IListingResponse, IPropertyAttrs} from "@prashanthsarma/property-portal-common"


export class PropertyService extends BaseService {
  private PROP_URL = CurrentConfig.PROP_URL || `${CurrentConfig.BASE_URL}/property`

  public async fetchPropertyListings() {
    const url = `${this.PROP_URL}/listing`;
    const resp = await this.callAPI<IListingResponse, null>(url, MethodType.GET, null, null);
    return resp;
  }

  public async fetchUserPropertyListings() {
    const url = `${this.PROP_URL}/user/listing`;
    const resp = await this.callAPI<IListingResponse, null>(url, MethodType.GET, null, null);
    return resp;
  }

  public async addUserPropertyListings(property: IPropertyAttrs){
    const url = `${this.PROP_URL}/user/listing`;
    const resp = await this.callAPI<null, IPropertyAttrs>(url, MethodType.POST, property, null);
    return resp;
  }

  public async removeUserPropertyListings(id: string){
    const url = `${this.PROP_URL}/user/listing/${id}`;
    const resp = await this.callAPI<IListingResponse, null>(url, MethodType.DELETE, null, null);
    return resp;
  }
}
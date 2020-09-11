import { BaseService, MethodType } from "../BaseService"
import { CurrentConfig } from "../../config"
import  {IListingResponse, IPropertyAttrs, IListing} from "@prashanthsarma/property-portal-common"


export class PropertyService extends BaseService {
  private PROP_URL = CurrentConfig.PROP_URL || `${CurrentConfig.BASE_URL}/property`

  public async fetchAllProperties() {
    const url = `${this.PROP_URL}/listing`;
    const resp = await this.callAPI<IListingResponse, null>(url, MethodType.GET, null, null);
    return resp;
  }

  public async fetchUserProperties() {
    const url = `${this.PROP_URL}/user/listing`;
    const resp = await this.callAPI<IListingResponse, null>(url, MethodType.GET, null, null);
    return resp;
  }

  public async fetchProperty(id: string) {
    const url = `${this.PROP_URL}/listing/${id}`;
    const resp = await this.callAPI<IListing, null>(url, MethodType.GET, null, null);
    return resp;
  }

  public async addProperty(property: IPropertyAttrs){
    const url = `${this.PROP_URL}/listing`;
    const resp = await this.callAPI<null, IPropertyAttrs>(url, MethodType.POST, property, null);
    return resp;
  }

  public async removeProperty(id: string){
    const url = `${this.PROP_URL}/listing/${id}`;
    const resp = await this.callAPI<IListingResponse, null>(url, MethodType.DELETE, null, null);
    return resp;
  }

  public async editProperty(id: string, property: IPropertyAttrs){
    const url = `${this.PROP_URL}/listing/${id}`;
    const resp = await this.callAPI<IListing, IPropertyAttrs>(url, MethodType.PUT, property, null);
    return resp;
  }
}
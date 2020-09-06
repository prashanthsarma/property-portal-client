import { AuthService } from "./AuthService";
import { PropertyService } from "./PropertyService";

export class API {
  public static auth = new AuthService();
  public static property = new PropertyService();
}
import {IListing} from "@prashanthsarma/property-portal-common"

export interface PropertyState {
  listings: IListing[];
  listingsError: string
  loadingListings : boolean
}

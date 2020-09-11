import React, { useEffect, useCallback } from 'react';
import { selectListings, selectLoadingListings, fetchUserProperties, removeProperty } from '../../reducers/property';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyCard } from '../common/PropertyCard';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { AddOrEditListing } from './AddOrEditListing';
import ProtectedRoute from '../common/ProtectedRoute';


export function MyListings() {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const listings = useSelector(selectListings)
  const loading = useSelector(selectLoadingListings)
  const stableDispatch = useCallback(dispatch, [])

  useEffect(() => {
    stableDispatch(fetchUserProperties());
  }, [location, stableDispatch])

  const onGotoAdd = () => {
    history.push('listings/add');
  }

  const renderListings = () => {
    if (listings.length > 0) {
      return (
        <div className="p-4">
          {listings.map(l =>
            <PropertyCard key={l.id}
              property={l}
              appendNodes={
                <div className="ml-auto mr-3 mt-2">
                  <button
                    className="mr-2 btn btn-secondary"
                    onClick={() => { history.push(`listings/${l.id}`) }}
                  >
                    {`Edit`}
                  </button>
                  <button
                    className="mr-2 btn btn-danger"
                    onClick={() => dispatch(removeProperty(l.id))}
                  >
                    {`Remove`}
                  </button>
                </div>
              }
            />
          )
          }
        </div >
      )
    } else {
      return (
        <div className="d-flex center-page flex-column align-items-center justify-content-center">
          <p>{`Seems you have not listed any property`}</p>
          <button className="btn btn-primary"
            onClick={onGotoAdd}>
            {`Add Property Listing`}
          </button>
        </div>
      )
    }
  }

  return (
    <Switch>
      <ProtectedRoute path="/listings/:id">
        <AddOrEditListing />
      </ProtectedRoute>
      <Route>
        <div>
          {listings.length > 0 ?
            <div className="d-flex w-100 mt-2">
              <p className="font-weight-bold m-0 mt-3 w-100">
                {`Your Listed Properties`}
              </p>

              <button className="btn btn-primary mr-4 position-absolute"
                style={{ right: 0 }}
                onClick={onGotoAdd}>
                {`Add Property Listing`}
              </button>

            </div>
            : null}
          {loading
            ? <div className="d-flex align-items-center justify-content-center center-page">
              <div className="spinner-border spinner-large"></div>
            </div>
            :
            renderListings()
          }
        </div>
      </Route>
    </Switch>

  );
}
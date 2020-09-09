import React, { useEffect, useCallback } from 'react';
import { selectListings, selectLoadingListings, fetchUserPropertyListings, removeUserPropertyListings } from '../../reducers/property';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyCard } from '../common/PropertyCard';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { AddListing } from './AddListing';
import ProtectedRoute from '../common/ProtectedRoute';


export function MyListings() {

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const listings = useSelector(selectListings)
  const loading = useSelector(selectLoadingListings)
  const stableDispatch = useCallback(dispatch, [])

  useEffect(() => {
    stableDispatch(fetchUserPropertyListings());
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
                <button
                  className="ml-auto mr-5 mt-2"
                  onClick={() => dispatch(removeUserPropertyListings(l.id))}
                >
                  {`Remove`}
                </button>
              }
            />
          )}
        </div>
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
      <ProtectedRoute path="/listings/add">
        <AddListing />
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
              <div className="spinner-border"></div>
            </div>
            :
            renderListings()
          }
        </div>
      </Route>
    </Switch>

  );
}
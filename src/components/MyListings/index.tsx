import React, { useEffect, useCallback } from 'react';
import { selectListings, selectLoadingListings, fetchUserPropertyListings, removeUserPropertyListings } from '../../reducers/property';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyCard } from '../common/PropertyCard';
import { Link, Switch, Route, useLocation } from 'react-router-dom';
import { AddListing } from './AddListing';
import ProtectedRoute from '../common/ProtectedRoute';


export function MyListings() {

  const dispatch = useDispatch();
  const location = useLocation();
  const listings = useSelector(selectListings)
  const loading = useSelector(selectLoadingListings)
  const stableDispatch = useCallback(dispatch, [])

  useEffect(() => {
    stableDispatch(fetchUserPropertyListings());
  }, [location, stableDispatch])


  return (
    <Switch>
      <ProtectedRoute path="/listings/add">
        <AddListing />
      </ProtectedRoute>
      <Route>
        <div>
          <Link to="listings/add">Add Property Listing</Link>
          <p>
            Your Listings
          </p>
          {loading
            ? <div className="d-flex vh-70 align-items-center justify-content-center">
              <p>Loading ...</p>
            </div>
            :
            <div className="p-4">
              {listings.map(l =>
                <PropertyCard key={l.id}
                  property={l}
                  appendNodes={
                    <button className="ml-auto mr-5 mt-2"
                      onClick={() => dispatch(removeUserPropertyListings(l.id))}
                    >
                      Remove
                  </button>
                  }
                />
              )}
            </div>
          }
        </div>
      </Route>
    </Switch>

  );
}
import React, { useEffect } from 'react';
import { API } from '../../api';
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

  useEffect(() => {
    dispatch(fetchUserPropertyListings());
  }, [location])


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
        </div>
      </Route>
    </Switch>

  );
}
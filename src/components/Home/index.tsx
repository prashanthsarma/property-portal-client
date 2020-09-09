import React, { useEffect, useState, useCallback } from 'react';
import { API } from '../../api';
import { fetchPropertyListings, selectListings, selectLoadingListings } from '../../reducers/property';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyCard } from '../common/PropertyCard';

type UserResolvedState = { [k: string]: string }

export function Home() {

  const [users, setUsers] = useState({} as UserResolvedState);

  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, [])

  const listings = useSelector(selectListings)
  const loading = useSelector(selectLoadingListings)

  useEffect(() => {
    stableDispatch(fetchPropertyListings());
  }, [stableDispatch])

  useEffect(() => {

    const getResolvedUsers = async () => {
      const ids = listings.map(l => l.userId).filter((v, i, a) => a.indexOf(v) === i);
      const users = await API.auth.ResolveUsers({ ids })
      if (users.data != null && Array.isArray(users.data)) {
        const usersResolved = users.data.reduce((result, r, i) => {
          result[r.id] = r.email;
          return result;
        }, {} as UserResolvedState)
        setUsers(usersResolved);
      }
    }
    getResolvedUsers();
  }, [listings])

  return (
    <div>
      <p>
        We have found following properties for you:
      </p>

      {loading
        ? <div className="d-flex vh-70 align-items-center justify-content-center">
          <div className="spinner-border"></div>
        </div>
        : <div className="p-4">
          {listings.map(l =>
            <PropertyCard
              key={l.id}
              property={l}
              appendNodes={
                <p className="m-0">{`Contact: ${users[l.userId] ? users[l.userId] : "Fetching ..."}`}</p>
              } />
          )}
        </div>
      }

    </div>
  );
}
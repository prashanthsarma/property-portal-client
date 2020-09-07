import React, { useEffect, useState } from 'react';
import { API } from '../../api';
import { fetchPropertyListings, selectListings, selectLoadingListings } from '../../reducers/property';
import { useDispatch, useSelector } from 'react-redux';
import { PropertyCard } from '../common/PropertyCard';

type UserResolvedState = { [k: string]: string }

export function Home() {

  const [users, setUsers] = useState({} as UserResolvedState);

  const dispatch = useDispatch();
  const listings = useSelector(selectListings)
  const loading = useSelector(selectLoadingListings)

  const onCurrentUser = async () => {
    const response = await API.auth.CurrentUser();
    console.log(response);
  }

  useEffect(() => {
    dispatch(fetchPropertyListings());
  }, [])

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
      <button onClick={onCurrentUser}>Get Current User</button>
      <p>
        We have found following properties for you:
      </p>
      <div className="p-4">
        {listings.map(l =>
          <PropertyCard
            key={l.id}
            property={l}
            appendNodes={
              <p className="ml-auto">{`Contact: ${users[l.userId]}`}</p>
            } />
        )}
      </div>
    </div>
  );
}
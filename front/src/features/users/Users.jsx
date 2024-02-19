import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';

import { getUsers } from '../../store/users/usersSlice';

import LoadingBloc from '../../components/LoadingBloc';

function Users() {
  const { auth } = useAuth();

  const users = useSelector((state) => state.users.users);
  const loaded = useSelector((state) => state.users.loaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(auth.token));
  }, [dispatch, auth]);

  return (
    <>
      <h1>UTILISATEURS</h1>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.id}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
      {loaded === 0 ? <LoadingBloc /> : null}
    </>
  );
}

export default Users;

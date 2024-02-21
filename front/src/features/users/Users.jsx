import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useAuth from '../../hooks/useAuth';

import { getUsers } from '../../store/users/usersSlice';

import DataGridPerso from '../../components/DataGridPerso';

function Users() {
  const { auth } = useAuth();

  const users = useSelector((state) => state.users.users);
  const loaded = useSelector((state) => state.users.loaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers(auth.token));
  }, []);

  const showColumn = [
    {
      field_bdd: 'id',
      table_text: 'Id',
      width: 80,
      align: 'left',
      editable: true,
    },
    {
      field_bdd: 'first_name',
      table_text: 'Prénom',
      width: 150,
      align: 'left',
      editable: true,
    },
    {
      field_bdd: 'last_name',
      table_text: 'Nom',
      width: 150,
      align: 'left',
      editable: true,
    },
    {
      field_bdd: 'email',
      table_text: 'E-mail',
      width: 200,
      align: 'left',
      editable: false,
    },
    {
      field_bdd: 'admin',
      table_text: 'Admin',
      width: 110,
      align: 'center',
      render: 'checkboxBoolean',
      editable: false,
    },
  ];

  return (
    <>
      <h1>UTILISATEURS</h1>
      <DataGridPerso
        showColumns={showColumn}
        datas={users}
        name="d'utilisateurs"
        loaded={loaded}
        add={false}
      />
    </>
  );
}

export default Users;

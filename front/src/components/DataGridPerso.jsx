import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  frFR,
} from '@mui/x-data-grid';

import useAuth from '../hooks/useAuth';

import { deleteUser, updateUser } from '../store/users/usersSlice';

import LoadingBloc from './LoadingBloc';

export default function DataGridPerso({
  showColumns,
  datas,
  name,
  loaded,
  add,
}) {
  const { auth } = useAuth();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    dispatch(deleteUser({ id, token: auth.token })).then((res) => {
      if (res.error) {
        setErrorMessage(res.payload);
      } else {
        setErrorMessage('');
        setRows(rows.filter((row) => row.id !== id));
      }
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    dispatch(
      updateUser({ id: newRow.id, data: newRow, token: auth.token }),
    ).then(() => {});
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  let columns = [];
  showColumns.map((column, i) => {
    let editable;
    auth.admin && column.editable ? (editable = true) : (editable = false);

    const columnObj = {
      field: `${column.field_bdd}`,
      headerName: `${column.table_text}`,
      width: `${column.width}`,
      type: `${column.type}`,
      headerAlign: `${column.align}`,
      align: `${column.align}`,
      editable: editable,
      renderCell: (params) => <RenderCell column={column} params={params} />,
    };
    columns.push(columnObj);
  });

  const columnAction = {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  };

  auth.admin ? columns.push(columnAction) : '';

  let rows_temp = [];
  datas.map((data, i) => {
    const rowObj = {};
    showColumns.map((column, j) => {
      const fieldName = column.field_bdd;
      Object.defineProperty(rowObj, fieldName, {
        value: data[fieldName],
      });
    });

    rows_temp.push(rowObj);
  });

  useEffect(() => {
    setRows(rows_temp);
  }, [datas]);

  return (
    <>
      {datas?.length ? (
        <>
          <Box className="relative">
            <DataGrid
              localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
              className="table-datagrid"
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
              rows={rows}
              rowHeight={25}
              columns={columns}
              columnHeaderHeight={30}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar: EditToolbar,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel, add },
              }}
            />
            {loaded === 0 ? <LoadingBloc /> : null}
          </Box>
          <p className="error">{errorMessage}</p>
        </>
      ) : (
        <p>Il n'y a pas {name}</p>
      )}
    </>
  );
}

function RenderCell({ column, params }) {
  return column.render == 'checkboxBoolean' ? (
    params.value ? (
      <Checkbox disabled checked />
    ) : (
      <Checkbox disabled />
    )
  ) : (
    params.value
  );
}

function EditToolbar({ setRows, setRowModesModel, add }) {
  const { auth } = useAuth();

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return auth.admin && add ? (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  ) : (
    ''
  );
}

import React from "react";
import MaterialTable from "material-table";
import "@material-ui/icons";
import "@material-ui/core/styles";
import { Container } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories, deleteCategory, postCategories, putCategories } from '../../redux/actions/category.js';

import store from '../../redux/store/index';

export default function MaterialTableDemo() {
  const dispatch = useDispatch();
  // const content = useSelector(state => state.categorias.data);
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(getCategories());
    store.subscribe(() => setData(store.getState().categorias.data))
  }, []);

  const [column, setColumn] = useState({
    columns: [
      { title: "Name", field: "name" },
    ],
  });

  console.log(data);

  const handleRowAdd = (newData, resolve) => {
    dispatch(postCategories(newData));
    setTimeout(() => {
      let dataToAdd = [...data];
      dataToAdd.push(newData);
      setData(dataToAdd);
      resolve();    
    }, 600); 
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    dispatch(putCategories(newData, oldData));
    setTimeout(() => {
      const dataUpdate = [...data];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setData([...dataUpdate]);
      resolve();
    }, 600);
  }

  const handleRowDelete = (oldData, resolve) => {
    dispatch(deleteCategory(oldData));
    setTimeout(() => {
      const dataDelete = [...data];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setData([...dataDelete]);
      resolve();
    }, 600);    
  }

  return (
    <Container style={{marginTop: '1.5rem'}}>
      <h2>Categories List</h2>
        <MaterialTable
          title=""
          columns={column.columns}
          data={data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve) => {
                handleRowAdd(newData, resolve)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleRowUpdate(newData, oldData, resolve);
              }),            
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                handleRowDelete(oldData, resolve);
              }),
          }}
        />
    </Container>
  );
}

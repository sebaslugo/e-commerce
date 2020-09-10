import React from "react";
import MaterialTable from "material-table";
import "@material-ui/icons";
import "@material-ui/core/styles";

import "./FormCategories.css";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategories, deleteCategory, axiosPostCategories, axiosPutCategories } from '../redux/actions/category.js';
import "./FormCategories.css";

export default function MaterialTableDemo() {
  const dispatch = useDispatch();
  const content = useSelector(state => state)
  const [column, setColumn] = useState({
    columns: [
      { title: "Name", field: "name" },
    ],
  });


  useEffect(() => {
    dispatch(fetchCategories())
  }, [])


  const refreshPage = () => {
    window.location.reload(false)
  }


  return (
    <div className="FormCategories">
      <MaterialTable
        title="Categories List"
        columns={column.columns}
        data={content.categorias.data}
        editable={{
          onRowAdd: (newData) =>
            setTimeout(() => {
              dispatch(axiosPostCategories(newData))
              refreshPage();

            }),
          onRowUpdate: (newData, oldData) =>
            setTimeout(() => {
              dispatch(axiosPutCategories(newData))
              refreshPage()
            })
          ,
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                dispatch(deleteCategory(oldData))

              }, 600)
            }),

        }}

      />
    </div>
  );
}

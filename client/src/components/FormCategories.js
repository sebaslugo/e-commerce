import React from "react";
import MaterialTable from "material-table";
import "@material-ui/icons";
import "@material-ui/core/styles";
import "./FormCategories.css"
// var _ = require('lodash');
import { useEffect, useState } from 'react';
import axios from 'axios'


export default function MaterialTableDemo() {
  const [cat, setCat] = useState();
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
    ],
  });
  useEffect(() => {
    axios
      .get('http://localhost:3001/products/category')
      .then(res => {
        setCat(res.data)
      })
  }, [])
  const refreshPage = () => {
    window.location.reload(false)
  }


  return (
    <div className="FormCategories">
      <MaterialTable
        title="Categories List"
        columns={state.columns}
        data={cat}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              console.log(newData)
              setTimeout(() => {
                resolve();
                axios({
                  method: 'post',
                  url: 'http://localhost:3001/products/category',
                  data: {
                    name: newData.name
                  }
                }).then(res =>
                  console.log(res))
                console.log(newData)
                refreshPage();
              }, 600);
            }),

          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                console.log(newData)
                console.log(oldData)
                axios({
                  method: 'PUT',
                  url: `http://localhost:3001/products/category/${oldData.id}`,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: {
                    name: newData.name
                  }
                }).then(res =>
                  console.log(res))
                refreshPage();
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                axios({
                  method: 'DELETE',
                  url: `http://localhost:3001/products/category/${oldData.id}`,
                }).then(res => {
                  console.log(res)
                  setCat(res.data)
                })
                refreshPage();
              }, 600);
            }),
        }}
      />
    </div>
  );
}

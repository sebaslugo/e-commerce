import React from "react";
import MaterialTable from "material-table";
import "@material-ui/icons";
import "@material-ui/core/styles";
import "./FormCategories.css"
// var _ = require('lodash');

// estos arrays son los que se traen cuando hacemos pedidos al servidor, hay que borrarlos cuando se haga la conexion
// const categorias = [{'name':'platos'},{'name':'ropa'}]
// const obj = {}
// for (let index = 0; index < categorias.length; index++) {
//     obj[categorias[index].name] = categorias[index].name;
// }
// console.log(obj)

const productos = [
  { name: "ropa" },
  { name: "tazas" },
  { name: "gorras" },
  { name: "tapabocas" },
  { name: "sudo" },
  { name: "zapatos" },
];

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: "Name", field: "name" },
      //   { title: 'Price', field: 'price',type:'numeric' },
      //    {title:'Description',field:'description'},
      //   {title:'Imagenes',field:'imagen'},
      //   {title:'Categories',field:'category', lookup:obj,}
    ],
    data: productos,
  });

  return (
    <div className="FormCategories">
    <MaterialTable
      title="Categories List"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    </div>
  );
}

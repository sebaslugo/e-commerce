import React from 'react';
import MaterialTable from 'material-table';
import  "@material-ui/icons";
import'@material-ui/core/styles';
var _ = require('lodash');

// estos arrays son los que se traen cuando hacemos pedidos al servidor, hay que borrarlos cuando se haga la conexion
const categorias = [{'name':'platos'},{'name':'ropa'}]
const obj = {}
for (let index = 0; index < categorias.length; index++) {
    obj[categorias[index].name] = categorias[index].name;    
}
console.log(obj)


const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg','https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg']

const productos = [{'name':'camiseta','price':'1200','description':'azul','imagen':imagenes[0],'category':'platos'},
                    {'name':'carro','price':'2200','description':'rojo','imagen':imagenes[1],'category':'ropa'},
                    {'name':'moto','price':'2200','description':'amarrilo','imagen':imagenes[1],'category':'ropa'},
                    {'name':'arroz','price':'2200','description':'verde','imagen':imagenes[1],'category':'ropa'},
                    {'name':'casa','price':'2200','description':'cafe','imagen':imagenes[1],'category':'ropa'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes[1],'category':'platos'}];


export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Price', field: 'price',type:'numeric' },
      {title:'Description',field:'description'},
      {title:'Imagenes',field:'imagen'},
      {title:'Categories',field:'category', lookup:obj,}
      
    ],
    data: productos,
  });

  return (
    <MaterialTable
      title="Product List"
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
  );
}
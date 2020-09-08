import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react'
import Form from './Form'
import './ProductList.css'
import axios from 'axios';
const _ = require('lodash');

const categorias = [{'name':'platos'},{'name':'ropa'}]
const obj = {}
for (let index = 0; index < categorias.length; index++) {
    obj[categorias[index].name] = categorias[index].name;    
}
console.log(obj)


const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg','https://image.dhgate.com/0x0s/f2-albu-g10-M00-37-09-rBVaVlyktamAaMItAACo9Qhz5no083.jpg/nuevos-hombres-camisa-para-hombre-de-manga.jpg']

/* const productos = [{'name':'camiseta','price':'1200','description':'azul','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'carro','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'ropa'}]},
                    {'name':'moto','price':'2200','description':'amarrilo','imagen':imagenes,'category':[{'name':'ropa'}]},
                    {'name':'arroz','price':'2200','description':'verde','imagen':imagenes,'category':[{'name':'ropa'}]},
                    {'name':'casa','price':'2200','description':'cafe','imagen':imagenes,'category':[{'name':'ropa'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]},
                    {'name':'platos','price':'2200','description':'rojo','imagen':imagenes,'category':[{'name':'platos'}]}]; */

export default function ProudctList() {
  const[productos,setProductos] = useState([])
  console.log(productos)
  const [table, setTable] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Price', field: 'price',type:'numeric' },
      {title:'Description',field:'description'},    
    ],
    data: productos,
  });
  const [producto,setProducto] = useState({})
  const [open,setOpen] = useState(false);

  const handleClose = () => setOpen(false )
  const handleOpen = (event,rowData) => { 
    console.log(rowData)   
    setOpen( true )
    if(!rowData.content){
      setProducto(rowData);
    }
    else{
      setProducto({})
    }

  }

  useEffect(() => {
    axios 
    .get('http://localhost:3001/products')
    .then(res => {
      setProductos(res.data)
    })
    
 },[])

  return (
    <div className='productlist-table'>

    <MaterialTable
    title="Product List"
    columns={table.columns}
    data={productos}
    actions={[
      {
        icon: 'edit',
        tooltip: 'Add Product',
        onClick: (event, rowData) => handleOpen(event,rowData)
      }
    ]}
    editable={{
      onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setTable((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}

    />
      <Grid columns={2}>
        <Grid.Column>
          <Button
            content='Agregar Producto'
            disabled={open}
            positive
            onClick={handleOpen}
          />

          <Portal onClose={handleClose} open={open}>
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '20%',
                zIndex: 1000,
              }}
            >
              <Form producto={producto}/>
              <Button
                content='Close'
                negative
                onClick={handleClose}
              />
            </Segment>
          </Portal>
        </Grid.Column>
      </Grid>
    </div>

  );
} 
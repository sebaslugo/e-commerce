import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button, Grid, Header, Segment, Portal,Icon } from 'semantic-ui-react'
import Form from './Form'
import './ProductList.css'
import {getCategories} from '../../redux/actions/category';
import {  getProducts, deleteProducts } from '../../redux/actions/productList'
import store from '../../redux/store/index';
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '@material-ui/core';

export default function ProudctList() {

  const dispatch = useDispatch();

  const [productos, setProductos] = useState()
  const categorias = useSelector(state => state.categorias.data) 
  const [table, setTable] = useState({
    columns: [
      { title: 'Nombre del producto', field: 'name' },
      { title: 'Precio', field: 'price', type: 'numeric' },
      { title: 'Descripcion', field: 'description' },
    ],
    data: [],
  });
  const refreshPage = () => {
    window.location.reload()
  }
  const [producto, setProducto] = useState({})
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    refreshPage()
    setOpen(false)
    
  }
  const handleOpen = (event, rowData) => {

    setOpen(true)

    if (!rowData.content) {
      setProducto(rowData);
    }
    else {
      setProducto({})
    }
    

  } 

  useEffect(() => {
    if(!productos){
      dispatch( getProducts());
      dispatch(getCategories());
    }
    store.subscribe(() => setProductos(store.getState().productList.data))
    
    
  },[])

  return (
    <div className='productlist-table'>
      
      <MaterialTable
        title="Lista de productos"
        columns={table.columns}
        data={productos}
        actions={[
          {
            icon: 'edit',
            // tooltip: 'Add Product',
            onClick: (event, rowData) => handleOpen(event, rowData)
          }
        ]}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setTable((prevState) => {
                  dispatch(deleteProducts(oldData))
                  refreshPage();
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
            inverted color='yellow'
            onClick={handleOpen}
          />

          <Portal
            onClose={handleClose} open={open}
          >
            <Segment
              style={{
                left: '30%',
                position: 'fixed',
                top: '5%',
                zIndex: 100,                
                backgroundColor:'#F0F1E6'
              }}
            >
              
              
              <div className ='list-cerrar'>
                <div id= 'list-buton' >
                  
                  <Icon link name='close' color='black' onClick = {handleClose}/> 
                  
                </div>
                
                <Form
                producto={producto} categorias={categorias}
                />
              </div>
              
            </Segment>
          </Portal>
        </Grid.Column>
      </Grid>
    </div>

  );
} 
import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react'
import Form from './Form'
import './ProductList.css'
import axios from 'axios';
import {getCategories} from '../../redux/actions/category';
import {  getProducts, deleteProducts } from '../../redux/actions/productList'
import store from '../../redux/store/index';
import { useDispatch, useSelector } from 'react-redux'

export default function ProudctList() {

  const dispatch = useDispatch();

  const [productos, setProductos] = useState()
  const categorias = useSelector(state => state.categorias.data) 
  const [table, setTable] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Price', field: 'price', type: 'numeric' },
      { title: 'Description', field: 'description' },
    ],
    data: [],
  });
  const refreshPage = () => {
    window.location.reload(false)
  }
  const [producto, setProducto] = useState({})
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    dispatch( getProducts());
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
    
    
  })

  return (
    <div className='productlist-table'>
      
      <MaterialTable
        title="Product List"
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
            positive
            onClick={handleOpen}
          />

          <Portal
            onClose={handleClose} open={open}
          >
            <Segment
              style={{
                left: '40%',
                position: 'fixed',
                top: '20%',
                zIndex: 1000,
              }}
            >
              <Form
                producto={producto} categorias={categorias}
              />
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
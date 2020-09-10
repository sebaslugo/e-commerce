import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react'
import Form from './Form'
import './ProductList.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { axiosProducts, axiosCategories, axiosDeleteProducts, axiosEditProducts } from '../redux/actions/productList'

export default function ProudctList() {

  const dispatch = useDispatch();
  const content = useSelector(state => state)

  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
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
    setOpen(false)
  }
  const handleOpen = (event, rowData) => {

    setOpen(true)
    // if (!rowData.content) {
    //   setProducto(rowData);
    // }
    // else {
    //   setProducto({})
    // }

  }

  useEffect(() => {
    dispatch(axiosProducts());
    // dispatch(axiosCategories());
  }, [])

  return (
    <div className='productlist-table'>
      {console.log("Estoy en el content", table)}

      <MaterialTable
        title="Product List"
        columns={table.columns}
        data={content.productList.data}
        // actions={[
        //   {
        //     icon: 'edit',
        //     // tooltip: 'Add Product',
        //     onClick: (event, rowData) => handleOpen(event, rowData)
        //   }
        // ]}
        editable={{
          onRowUpdate: (newData, oldData) =>
            setTimeout(() => {
              dispatch(axiosEditProducts(newData))
              // refreshPage()
            })
          ,
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setTable((prevState) => {
                  dispatch(axiosDeleteProducts(oldData))
                  refreshPage();
                  // const data = [...prevState.data];
                  // data.splice(data.indexOf(oldData), 1);
                  // return { ...prevState, data };
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
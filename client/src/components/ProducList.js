import React,{useState,useEffect} from 'react';
import MaterialTable from 'material-table';
import { Button, Grid, Header, Segment, Portal } from 'semantic-ui-react'
import Form from './Form'
import './ProductList.css'
import axios from 'axios';


export default function ProudctList() {
  const[productos,setProductos] = useState([])
  const[categorias,setCategorias] = useState([])
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

  const handleClose = () => {
    setOpen(false )
    axios 
    .get('http://localhost:3001/products')
    .then(res => {
    setProductos(res.data)
    })    
    }
  const handleOpen = (event,rowData) => { 
      
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
    axios 
    .get('http://localhost:3001/products/category')
    .then(res => {
    setCategorias(res.data)
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
              <Form producto={producto} categorias = {categorias}/>
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
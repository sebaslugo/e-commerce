import React,{useState} from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lista from './Lista'
import { useDispatch,useSelector } from 'react-redux'
import {agregarProducto,editProducto} from '../redux/actions'
/* let arreglo = [] */




function ProductList ()  {
    const dispatch = useDispatch()
    const {productEdit,edit} = useSelector(state => state)
    
    const [producto,setProducto] = useState ({})

   
   
   
    const handleSubmit = (event) => {
        event.preventDefault()
        /* arreglo.push(producto)
        setProductos(arreglo) */         
        
        dispatch(agregarProducto(producto)) 

           
    }
    const handleInputChange = (event) => { 
           
        setProducto({
            ...producto,
            [event.target.name]: event.target.value,            
            
        });       

    }
    return (
        <div>
            <div>
                <Form onSubmit={handleSubmit}>
                {/* Este form es para hacer pruebas con el id, hay que borrarlo cuando se haga la conexion con la api */}
                <Form.Group as={Row} controlId="id">
                    <Form.Label column sm={2}>
                    id
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {handleInputChange} type="text" name = 'id' placeholder="id" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="title">
                    <Form.Label column sm={2}>
                    Nombre del producto
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {handleInputChange} type="text" value={productEdit.productName} name = 'productName' placeholder="Nombre del producto" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="precio">
                    <Form.Label column sm={2}>
                    Precio
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {handleInputChange} type="number" value={productEdit.price} name='price' placeholder="Precio $" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Descripcion
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control onChange = {handleInputChange} type="text" value={productEdit.description} name = 'description' placeholder="Descripcion" />
                    </Col>
                </Form.Group>            
                <Form.Group>
                    <Form.File onChange = {handleInputChange} name = 'imagen' value={productEdit.uploads} multiple name="uploads" id="exampleFormControlFile1" accept="image/png, image/jpeg" label="Cargar Imagen" />
                </Form.Group>
                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button type="submit">{edit === false ? "Cargar Producto" : "Editar Producto"}</Button>
                    </Col>
                </Form.Group>                
                </Form>
            </div>
            
            <Lista />
                
            
        </div>
    )
}

export default ProductList;
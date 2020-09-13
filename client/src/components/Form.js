import React, {component, useState, useEffect } from 'react'
import './Form.css'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  TextArea,
} from 'semantic-ui-react'
import axios from 'axios';
import { getProducts, postProduct,editProduct  } from '../redux/actions/producto.js'
import {deleteProductCategory,addProductCategory} from '../redux/actions/category'
import store from '../redux/store/index';
import { useDispatch,useSelector } from 'react-redux';


function Formulario ({producto,categorias}) {
    const dispatch = useDispatch();
    const [itemCategoria,setItemCategoria] = useState([])
    const[checked,setchecked]=useState(false);
    const[state,setState] = useState({});

    useEffect(() => {
    
        if(producto.id){
            dispatch(getProducts(producto.id));
            store.subscribe(() =>{
                setState(() => store.getState().productos.data.producto)
                setItemCategoria(() => store.getState().productos.data.categorias)
            })
        }
    },[])

    const handleCheck = (categoria) => {         
            if(itemCategoria){
                for (let i = 0; i < itemCategoria.length; i++) {
                    if(categoria.name === itemCategoria[i].name){
                       return 'delete'              
                    }
                } 
                return 'add'   
            }                    
    }

    
    const handleSubmit = (e) => {
        let bodyFormData = new FormData();
        bodyFormData.set('name',state.name);
        bodyFormData.set('price',state.price);
        bodyFormData.set('description',state.description);
        bodyFormData.set('stock',state.stock); 
        if(state.images){
            state.images.map((imag)=> {
                bodyFormData.append('image', imag);
            })
        }
        dispatch(postProduct(bodyFormData))
        
    }

    const handleEdit = (e) => {
        let id = state.id
        let bodyFormData = new FormData();
        bodyFormData.set('name',state.name);
        bodyFormData.set('price',state.price);
        bodyFormData.set('description',state.description);
        bodyFormData.set('stock',state.stock);
        bodyFormData.set('imagenes',state.imagenes) 
        if(state.images){
            state.images.map((imag)=> {
                bodyFormData.append('image', imag);
            })
        } 
        dispatch(editProduct (bodyFormData,id))
        
    }
    const handleChange = (e, { value }) => {
        setState ({
            ...state,
            [e.target.name] : value,
        })
    }
    const handleCategory = (id,check) => {       
        
        if(check === 'delete'){
            dispatch(deleteProductCategory(state.id,id))     
        }
        if(check === 'add'){
            dispatch(addProductCategory(state.id,id))
        }

    } 
    
    const handleFiles = (e) => {
        let array = []
        for (let i = 0; i < e.target.files.length; i++) {
            array.push(e.target.files[i])   
        } 
        setState({
                ...state,
                images:array
        })
        
          
    }

    const handleDelete = (e) => {
        setState ({
            ...state,
            imagenes:state.imagenes.filter(imag => imag !== e.target.value)           
        })
        
    }
    
    return (
        <div>
            <Form>
            <Form.Group widths='equal'>
            <Form.Field
                control={Input}
                label='Name'
                placeholder='Name'
                name = 'name'
                placeholder = {producto.name}
                onChange={handleChange}
                
            />
            <Form.Field
                control={Input}
                type='number'
                label='price'
                placeholder='price'
                name = 'price'
                placeholder= {producto.price}
                onChange={handleChange}
                
            />
            <Form.Field
                control={Input}
                type='number'
                label='stock'
                placeholder='stock'
                name = 'stock'
                placeholder= {producto.stock}
                onChange={handleChange}
                
            />
            </Form.Group>
            <Form.Field>
                <ul >
                    {producto.id && categorias.map((categoria,index) => 
                        <li key = {index}>
                            {categoria.name}
                            <button  onClick = {() => handleCategory(categoria.id,handleCheck(categoria))}>{handleCheck(categoria)}</button>
                        </li>                        
                    )}
                </ul>  
            </Form.Field>
            <Form.Field
            control={TextArea}
            label='Description'
            placeholder='Tell us more about your product...'
            placeholder= {producto.description}
            name = 'description'
            onChange={handleChange}
            />
            {state.imagenes && <Form.Field>
                    <label>imagenes</label>
                    <ul >
                    {state.imagenes.map((image,index) => 
                        <li key = {index}>
                            {image}
                            <button value = {image} onClick = {handleDelete}>x</button>
                        </li>
                        
                    )}
                    </ul>                    
                
                </Form.Field>}           
            <Form.Field>
                <label>Agregar imagenes</label>
                <input  className = 'form-imagen' type='file' multiple={true} name='imagen'  accept="image/*" onChange = {handleFiles}></input>
            </Form.Field>
            {!producto.id && <Form.Field control={Button} onClick = {handleSubmit}>{'AGREGAR'}</Form.Field>}
            {producto.id && <Form.Field control={Button} onClick = {handleEdit}>{'EDITAR'}</Form.Field>}
    
            
            </Form>
            
        </div>
    
    )

}

export default Formulario
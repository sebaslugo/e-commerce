import React, {component, useState, useEffect } from 'react'
import './Form.css'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  TextArea,
  Image,
  List,Icon
} from 'semantic-ui-react'
import axios from 'axios';
import { getProduct, postProduct,editProduct  } from '../../redux/actions/producto.js'
import {deleteProductCategory,addProductCategory} from '../../redux/actions/category'
import store from '../../redux/store/index';
import { useDispatch,useSelector } from 'react-redux';



function Formulario ({producto,categorias}) {
    const dispatch = useDispatch();
    const [itemCategoria,setItemCategoria] = useState([])
    const[checked,setchecked]=useState(false);
    const[state,setState] = useState({});

    useEffect(() => {
    
        if(producto.id){
            dispatch(getProduct(producto.id));
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

    const handleDelete = (image) => {
        console.log(image)
        setState ({
            ...state,
            imagenes:state.imagenes.filter(imag => imag !== image)           
        })
        
    }
    
    return (
        <div className='form_formulario'>
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
            <label>Categorias</label>
                <List divided horizontal size='small'>
                {producto.id && categorias.map((categoria,index) =>
                    <List.Item>
                        <Icon link name={handleCheck(categoria)} color='black' onClick = {() => handleCategory(categoria.id,handleCheck(categoria))}/>                                               
                    <List.Content>                        
                        <List.Header>{categoria.name}</List.Header>                          
                    </List.Content>
                    </List.Item>
                )}
                </List> 
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
                    <Image.Group size='tiny'>
                        {state.imagenes.map((image,index) => 
                        <div className='form_contenedor'>
                            <Image src={`http://localhost:3001/${image}`} />
                            <div className='form_botonencima'><Button circular color='black' icon='delete' size='mini' onClick = {() => handleDelete(image)}/>  </div>    
                        </div>
                        
                        )}                        
                    </Image.Group>                    
                </Form.Field>}           
            <Form.Field>
            <label>Agregar imagenes</label>
                <div>
                    <input  id='file' type='file' multiple={true} name='imagen'  accept="image/*" onChange = {handleFiles}></input>
                    <label className='file_label' for= 'file'>
                        <Icon link name="file image" color='black' size='large' /> 
                        (3 max)
                    </label>
                </div>               
                
            </Form.Field>
            {!producto.id && <Form.Field control={Button} inverted color='yellow' onClick = {handleSubmit}>{'AGREGAR'}</Form.Field>}
            {producto.id && <Form.Field control={Button}  inverted color='yellow' onClick = {handleEdit}>{'EDITAR'}</Form.Field>}           
            </Form>
            
        </div>
    
    )

}

export default Formulario
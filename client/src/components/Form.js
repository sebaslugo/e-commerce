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



const categorias = [{'name':'platos'},{'name':'ropa'}]

function Formulario ({producto}) {
    const [images, setImages] = useState({
        columns: [
          { title: 'image', field: 'name' },  
        ],
        data: producto.imagen,
      });
  const [state,setState] = useState({'category':[],'imagenes':[],'stock':1})

  useEffect(() => {
    if(producto){
        setState(producto)
    }
},[])
    const handleCheck = (categoria) => {
        if(producto.category){
            for (let i = 0; i < producto.category.length; i++) {
                if(categoria.name === producto.category[i].name){
                    return true;
                }
            } 
        }
    }

    const handleSubmit = () => {
        console.log(state)
        axios.post('http://localhost:3001/products',state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    const handleChange = (e, { value }) => {
        setState ({
            ...state,
            [e.target.name] : value,
            'stock':'1'
        })
    }
    const handleCategory = (e,{value}) => {
        e.preventDefault();
        let validate = true
        let obj = {
            'name':value
        }        
        let array = state.category.filter((categoria) => {
            if(categoria.name === value){
                validate = false;
            }
            else{
                return categoria
            }
        })
        if(validate){
            setState({
                ...state,
                category:state.category.concat(obj)
            })             
        } 
        else{
            validate = true;
            setState({
                ...state,
                category:array
            })
        }  
    } 
    
    const handleFiles = (e) => {
        // console.log("este es el nombre de la url de la foto" ,e.target.files[0].name)
        setState({
            ...state,
            image:e.target.files
        })     
        /* now you can work with the file list */
        console.log(state)
      }

    const handleDelete = (e) => {
        // console.log(e.target.value)
        // console.log(state.imagen)
        setState ({
            ...state,
            // imagenes:state.imagen.filter(imag => imag !== e.target.value)
            imagenes: e.target.value
        })
        console.log(state)
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
            </Form.Group>
            <Form.Group inline>
                <label>Categorias</label>
                {categorias.map((categoria) => 
                    <Checkbox label={categoria.name} name='category' defaultChecked ={handleCheck(categoria)} onChange = {handleCategory} value = {categoria.name}  />
                )}        
            </Form.Group>
            <Form.Field
            control={TextArea}
            label='Description'
            placeholder='Tell us more about your product...'
            placeholder= {producto.description}
            name = 'description'
            onChange={handleChange}

            />
            {producto.imagenes && <Form.Field>
                    <label>imagenes</label>
                    <ul>
                    {state.imagenes.map((image) => 
                        <li>
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
            <Form.Field control={Button} onClick = {handleSubmit}>{'AGREGAR'}</Form.Field>
            
            </Form>
            
        </div>
    
    )

}

export default Formulario
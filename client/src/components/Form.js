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
    const [product,setProduct] = useState({'category':[],'imagenes':[]})
    const [images, setImages] = useState({
        columns: [
          { title: 'image', field: 'name' },  
        ],
        data: producto.imagenes,
      });
    

  useEffect(() => {
    if(producto){
        setProduct(producto)
    }  
    
    
    },{})
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
        console.log(product)
        axios.post('http://localhost:3001/products',product)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    const handleChange = (e, { value }) => {
        setProduct({
            ...product,
            [e.target.name] : value,
        })
    }
    console.log(product)
    const handleCategory = (e,{value}) => {
        e.preventDefault();
        let validate = true
        let obj = {
            'name':value
        }        
        let array = product.category.filter((categoria) => {
            if(categoria.name === value){
                validate = false;
            }
            else{
                return categoria
            }
        })
        if(validate){
            setProduct({
                ...product,
                category:product.category.concat(obj)
            })             
        } 
        else{
            validate = true;
            setProduct({
                ...product,
                category:array
            })
        }  
               
    } 
    
     const handleFiles = (e) => {
        setProduct({
            ...product,
            files:e.target.files
        })     
        /* now you can work with the file list */
      } 

    const handleDelete = (e) => {        
        setProduct({
            ...product,
            imagenes:product.imagenes.filter(imag => imag !== e.target.value)
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
                    {product.imagenes.map((image) => 
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
import React, { Component, useState } from 'react'
import './Form.css'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'
import { truncate, set, map } from 'lodash'


const categorias = [{'name':'platos'},{'name':'ropa'}]

function Formulario ({producto}) {

  const [state,setState] = useState({'category':[]})
  const[validate,setValidate] = useState (false)
  const handleCheck = (categoria) => {
      if(categoria.name === producto.category){
          return true;
      }
      else{return false;}
  }

    const handleSubmit = () => console.log(state)
    const handleChange = (e, { value }) => {
        setState ({
            ...state,
            [e.target.name] : value
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
       
    return (
        <div>
            <Form>
            <Form.Group widths='equal'>
            <Form.Field
                control={Input}
                label='Name'
                placeholder='Name'
                name = 'name'
                value = {producto.name}
                onChange={handleChange}
            />
            <Form.Field
                control={Input}
                type='number'
                label='price'
                placeholder='price'
                name = 'price'
                value = {producto.price}
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
            value ={producto.description}
            name = 'description'
            onChange={handleChange}

            />
            <Form.Field>
                <label>Agregar imagenes</label>
                <input  className = 'form-imagen' type='file' multiple={true} name='imagen'></input>
            </Form.Field>
            <Form.Field control={Button} onClick = {handleSubmit}>Submit</Form.Field>
            
            </Form>
            
        </div>
      
    )
  
}

export default Formulario
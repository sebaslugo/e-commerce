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


function Formulario ({producto,categorias}) {
    const[itemCategoria,setItemCategoria] = useState([])
    const[checked,setchecked]=useState(false)
    const [state,setState] = useState({}) 

  useEffect(() => {
    
    if(producto){
        axios 
        .get(`http://localhost:3001/products/${producto.id}`)
        .then(res => {
        setState(res.data.producto)
        setItemCategoria(res.data.categorias)
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
        var bodyFormData = new FormData();
        bodyFormData.set('name',state.name);
        bodyFormData.set('price',state.price);
        bodyFormData.set('description',state.description);
        bodyFormData.set('stock',state.stock); 
        if(state.image){
            state.image.map((imag)=> {
                bodyFormData.append('image', imag);
            })
        }                 
        axios({
            method: 'post',
            url: 'http://localhost:3001/products',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                return(response)
                

            })
            .then((response) => {
                console.log(response)
                return axios.get(`http://localhost:3001/products/${response.data.id}`)                   
            })
            .then(res => {
                setState(res.data.producto)
                alert('se creo el producto')
            })
            .catch(function (response) {
                //handle error
                alert('upss,completa todos los campos obligatorios')
            });
        
    }
    const handleChange = (e, { value }) => {
        setState ({
            ...state,
            [e.target.name] : value,
        })
    }
    const handleCategory = (id,check) => {       
        console.log(id)
        console.log(check)
        if(check === 'delete'){
            axios
            .delete(`http://localhost:3001/products/${state.id}/category/${id}`)
            .then(function (response) {
                //handle success
                alert('se elimino el producto de la categoria')
            })
            .catch(function (response) {
                //handle error
                alert('ups,intenta de nuevo')
            });        
        }
        if(check === 'add'){
            axios
            .post(`http://localhost:3001/products/${state.id}/category/${id}`)
            .then(function (response) {
                //handle success
                alert('se agrego el producto a la categoria')
            })
            .catch(function (response) {
                //handle error
                alert('Agrega el producto y luego agrega sus categorias')
            }); 
        }

    } 
    
    const handleFiles = (e) => {
        // console.log("este es el nombre de la url de la foto" ,e.target.files[0].name)
        let array = []
        console.log(e.target.files)
        for (let i = 0; i < e.target.files.length; i++) {
            array.push(e.target.files[i])   
        }
        setState({
            ...state,
            image:array
        })  
          
        
        }

    const handleDelete = (e) => {
            

        setState ({
            ...state,
            imagenes:state.imagenes.filter(imag => imag !== e.target.value)
            /* imagenes: e.target.value */
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
                    {categorias.map((categoria) => 
                        <li key = {categoria.id}>
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
                    {state.imagenes.map((image) => 
                        <li key = {state.id}>
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
            {/* <Form.Field control={Button} type="submit">{'AGREGAR'}</Form.Field> */}
            
            </Form>
            
        </div>
    
    )

}

export default Formulario
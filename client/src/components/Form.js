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
    
    handleCheck({'name':'carros'})
    
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
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        
    }
    const handleChange = (e, { value }) => {
        setState ({
            ...state,
            [e.target.name] : value,
        })
    }
    const handleCategory = (e,{value}) => {
        e.preventDefault();
        console.log(value)
/*         let validate = true
        let obj = {
            'name':value
        }        
        let array = categorias.filter((categoria) => {
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
        }  */ 
    } 
    
    const handleFiles = (e) => {
        // console.log("este es el nombre de la url de la foto" ,e.target.files[0].name)
        let array = []
        console.log(e.target.files)
        for (let i = 0; i < e.target.files.length; i++) {
            array.push(e.target.files[i])   
        }
        console.log(array)
        setState({
            ...state,
            image:array
        })  
          
        /* axios.post('http://localhost:3001/products',e.target.files)
        .then(res => alert('producto cargado'))
        .catch(err => alert('completa todos los campos')) */
        
        /* now you can work with the file list */
        
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
                            <button onClick = {handleCategory}>{handleCheck(categoria)}</button>
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
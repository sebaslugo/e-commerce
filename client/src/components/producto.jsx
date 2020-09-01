import React,{useState} from 'react';
import s from './producto.css';



const validate = (price) => {
    return price
}



function Producto (props)  {
    const [price,setPrice] = useState (0);

    const onChange = (event) => {
        event.preventDefault();
        setPrice(event.target.value*props.price);
    }
    return (
        <div className = "product">
            <div className = 'head'>
                <img className = "imagen" src = 'https://www.40defiebre.com/wp-content/uploads/2015/10/imagenes.png'/>
                <div className = 'info'>
                    <h1>{props.title}</h1>
                <div>
                    <span>Cantidad</span>
                    <input type='number' onChange = {onChange}/>
                    
                </div>            
                <div>
                    <span>Precio = $</span>
                    <span>{price}</span>
                </div>            
            </div>        

            </div>
            
            <>          
            <span>description</span>
            <p>{props.description}</p>
            </>
        </div>
    )
}

export default Producto;
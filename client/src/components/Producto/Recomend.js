import React,{useState,useEffect} from 'react'
import { Image } from 'semantic-ui-react'
import { useDispatch,useSelector} from 'react-redux';
import {Typography } from '@material-ui/core/';
import { Link } from "react-router-dom";
import './Recommend.css'
import { getProducts } from '../../redux/actions/productList';


function Recommend ({productoId}) {
    const dispatch = useDispatch()
    const [productos,setProductos] = useState()
    let fullproduct = useSelector(state => state.productList.data)
 
    useEffect(()=>{
        if(!fullproduct){
            
        }
        if(productoId && !productos && fullproduct){            
            let full = fullproduct.filter(product => product.id != productoId)
            setProductos(full.slice(0,3))
        }
        
    })
    
    const handleClick = (id) => {
        window.location.assign(`http://localhost:3000/producto/${id}`)

    }
    
    return(
        <div>
            {productos && <Typography gutterBottom variant="h4" component="h2">
                        Productos que te pueden gustar
            </Typography>}
            {productos && productos.length > 0 && productos.map((producto) =>(                
                <div className = 'recommend_card' onClick={() => handleClick(producto.id)}>                    
                    <Image src={`http://localhost:3001/${producto.imagenes[0]}`} size='medium' />
                    <Typography variant="h5" color="textSecondary">
                        {producto.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" >
                        $ {producto.price}
                    </Typography>
                </div>
                
                                  
            ))}
            
            
        </div>
        
    ) 

}
        

export default Recommend
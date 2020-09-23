import React,{useState,useEffect} from 'react'
import { Image } from 'semantic-ui-react'
import { getProducts } from '../../redux/actions/productList';
import { useDispatch,useSelector} from 'react-redux';
import store from '../../redux/store/index';

const Recommend = ({name}) => {
    const dispatch = useDispatch()
    const [productos,setProductos] = useState()
    let fullproduct = useSelector(state => state.productList.data)
 
    useEffect(()=>{
        if(fullproduct){
            setProductos(fullproduct.slice(0,3))
        }
        
    },[])
   
    return(
        <div>
            {productos && productos.length > 0 && productos.map((producto) =>(
                <Image src={`http:/localhost:3001/${producto.imagenes[0]}`} size='small' />
            ) 
            
            )}
            
        </div>
        
    ) 

}
        

export default Recommend
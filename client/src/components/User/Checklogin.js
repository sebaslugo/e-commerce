import React, { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/actions/menuLogIn';




export const CheckUser = () => {
    const dispatch = useDispatch()
    const [id,setId] = useState ()
    const [cart,setCart] = useState()
    
    useEffect(()=> {
        
        dispatch(getUser()) 
        setId(localStorage.getItem('idUser') && localStorage.getItem('idUser') )        
        window.location.reload()                   
        if (id){  
                       
            window.location.assign("http://localhost:3000")
        }
            
        
          
    })
    
    
    
    return (
        <div>
            
        </div>
    )
}

export default CheckUser;
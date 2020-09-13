import React, { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { axiosOrden } from '../redux/actions/orden';
import store from '../redux/store/index';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'
let key=0;
let array = [0,1,2]
function Orden (props) {
    const dispatch = useDispatch();
    const [ordenes,setOrdenes] = useState(store.getState);
    useEffect(() => {

        // traer el id de la orden para setearlo en la accion

        dispatch(axiosOrden(1));
        store.subscribe(()=>{
            setOrdenes(() => store.getState().orden.data);
        });

    },{})
    console.log(ordenes)
    return(
        <div>
            <Table compact celled definition>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>User</Table.HeaderCell>
                    <Table.HeaderCell>State</Table.HeaderCell>
                    <Table.HeaderCell>NameProduct</Table.HeaderCell>
                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                    <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
               
                <Table.Row>
                <Table.Cell>{ordenes.orden.user && ordenes.orden.user.name}</Table.Cell>
                <Table.Cell>{ordenes.orden.status && ordenes.orden.status}</Table.Cell>
                <Table.Cell>
                <ul>
                {ordenes.orden.products && ordenes.orden.products.map((producto)=>(
                    <li key={key++}>{producto.name}</li>
                ))}
                </ul>
                </Table.Cell> 
                <Table.Cell>
                <ul>
                {ordenes.items && ordenes.items.map((producto)=>(
                    <li key={key++}>{producto.quantity}</li>
                ))}
                </ul>
                </Table.Cell> 
                <Table.Cell>
                <ul>
                {ordenes.items && ordenes.items.map((producto)=>(
                    <li key={key++}>{producto.price}</li>
                ))}
                </ul>
                </Table.Cell>              
                </Table.Row>                             
                </Table.Body>
                <Table.Footer fullWidth>
                <Table.Row>                    
                    <Table.HeaderCell colSpan='6'>
                        {ordenes.orden.status === 'creada' && <Button size='small'>Aprovada</Button>}
                        {ordenes.orden.status === 'creada' &&<Button size='small'>Cancelada</Button>}
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    )
}

export default Orden
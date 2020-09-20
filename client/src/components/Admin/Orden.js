import React, { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container, Table } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import {editOrden} from "../../redux/actions/shoppingCart";
import { getOrden } from '../../redux/actions/orden';
import store from '../../redux/store/index';

function Orden () {
    const dispatch = useDispatch();
    const [ordenes,setOrdenes] = useState(store.getState);
    const { id } = useParams();

    useEffect(() => {        
        dispatch(getOrden(id));
        store.subscribe(()=>{
            setOrdenes(() => store.getState().orden.data);
        });

    },{})

    const handleEdit = (e,value) => {
        let status = value.children.toLowerCase()
        let data = {
            'status':status
        }
        dispatch(editOrden(ordenes.orden.id,data))
    }
    return(
        <Container style={{marginTop: '1.5rem'}}>
            <h2>Order Detail</h2>
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
                    {ordenes.orden.products && ordenes.orden.products.map((producto, index)=>(
                        <li key={index}>{producto.name}</li>
                    ))}
                    </ul>
                    </Table.Cell> 
                    <Table.Cell>
                    <ul>
                    {ordenes.items && ordenes.items.map((producto, index)=>(
                        <li key={index}>{producto.quantity}</li>
                    ))}
                    </ul>
                    </Table.Cell> 
                    <Table.Cell>
                    <ul>
                    {ordenes.items && ordenes.items.map((producto, index)=>(
                        <li key={index}>$ {producto.price}</li>
                    ))}
                    </ul>
                    </Table.Cell>                                  
                </Table.Row>
                </Table.Body>
                <Table.Footer fullWidth>
                <Table.Row>                    
                    <Table.HeaderCell colSpan='5'>
                        {ordenes.orden.status === 'creada' && <Button size='small' onClick={handleEdit}>Completada</Button>}
                        {ordenes.orden.status === 'creada' &&<Button size='small' onClick={handleEdit}>Cancelada</Button>}
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    )
}

export default Orden
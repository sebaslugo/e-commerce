import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getOrders } from '../../redux/actions/orden';
import store from '../../redux/store';
import { Container, Table, Button, Dropdown, Input }  from 'semantic-ui-react';
import { Link } from "react-router-dom";
import './OrderList.css'

const tagOptions = [
    {
        key: 'all',
        text: 'Todas las ordenes',
        value: 'all',
        label: { color: 'purple', empty: true, circular: true },
    },
    {
      key: 'carrito',
      text: 'Carrito',
      value: 'carrito',
      label: { color: 'red', empty: true, circular: true },
    },
    {
      key: 'creada',
      text: 'Creada',
      value: 'creada',
      label: { color: 'blue', empty: true, circular: true },
    },
    {
      key: 'completa',
      text: 'Completada',
      value: 'completada',
      label: { color: 'black', empty: true, circular: true },
    },
    {
      key: 'cancelada',
      text: 'Cancelada',
      value: 'cancelada',
      label: { color: 'purple', empty: true, circular: true },
    },
    
  ]
  

export default function OrderList() {

    const dispatch = useDispatch();
    const [orders, setOrders] = useState();
    const [filStatus,setFilStatus] = useState()
    

    useEffect(() => {
        if(!orders){
            dispatch(getOrders());
            store.subscribe(() => setOrders(store.getState().orden.data));
        }
        if(!filStatus){
            setFilStatus(orders)
        }
        
    });

    const handleClick = (data,value) => {
        let status = value.value;
        console.log(status)
        if(status === 'all'){
            setFilStatus(orders)
        }
        else{
            setFilStatus(orders.filter(order => order.status === status))

        }
        
    }
    
    console.log(filStatus)

    return (
    <Container style={{marginTop: '1.5rem'}}>
        <h2>Listado de Ordenes</h2>
        <div className = "orderList_filter">
            <Dropdown text='Filtrar por estados' multiple icon='filter'>
                <Dropdown.Menu>
                <Dropdown.Header icon='tags' content='Estado de la orden' />
                <Dropdown.Menu scrolling>
                    {tagOptions.map((option) => (
                    <Dropdown.Item key={option.value} {...option} onClick = {handleClick}/>
                    ))}
                </Dropdown.Menu>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        
        <Table compact celled definition>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Id de la orden</Table.HeaderCell>
                    <Table.HeaderCell>Estado</Table.HeaderCell>
                    <Table.HeaderCell>Fecha de creación</Table.HeaderCell>
                    <Table.HeaderCell>Nombre del usuario</Table.HeaderCell>
                    <Table.HeaderCell>Email del usuario</Table.HeaderCell>
                    <Table.HeaderCell>Ver Orden</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {filStatus && filStatus.length > 0 && filStatus.map((order, index) => (
                    <Table.Row key={index}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>{order.createdAt}</Table.Cell>  
                    <Table.Cell>{order.user.name}</Table.Cell>
                    <Table.Cell>{order.user.email}</Table.Cell>
                    <Table.Cell><Link to={`/admin/order/${order.id}`}><Button size='small'>Ver</Button></Link></Table.Cell>
                </Table.Row>
                ))}                               
            </Table.Body>                             
        </Table>
    </Container>
    )
}
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getOrders } from '../redux/actions/orden';
import store from '../redux/store';
import { Container, Table, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default function OrderList() {

    const dispatch = useDispatch();
    const [orders, setOrders] = useState();

    useEffect(() => {
        dispatch(getOrders());
        store.subscribe(() => setOrders(store.getState().orden.data));
    }, []);

    console.log(orders);

    return (
    <Container style={{marginTop: '1.5rem'}}>
        <h2>Order List</h2>
        <Table compact celled definition>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Order Id</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Created At</Table.HeaderCell>
                    <Table.HeaderCell>User Id</Table.HeaderCell>
                    <Table.HeaderCell>User Name</Table.HeaderCell>
                    <Table.HeaderCell>User Email</Table.HeaderCell>
                    <Table.HeaderCell>Ver Orden</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                {orders && orders.length > 0 && orders.map((order, index) => (
                    <Table.Row key={index}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>{order.createdAt}</Table.Cell> 
                    <Table.Cell>{order.user.id}</Table.Cell>  
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
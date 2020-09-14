/* ********************************************************* */
// S49: Crear Ruta para admins
/* ********************************************************* */
import React from 'react';
import { Container, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import products from '../../imagenes/products.jpg';
import categories from '../../imagenes/categories.jpg';
import orderlist from '../../imagenes/orderlist.jpg';

export const Admin = () => {
    return (
        <Container style={{marginTop: '1.5rem'}}>
            <h2 style={{marginBottom: '1.5rem'}}>Admin Dashboard</h2>
            <Card.Group itemsPerRow={3}>
                <Link to="/admin/products" style={{textDecoration: 'none'}}>
                    <Card style={{margin: '1rem'}}>
                        <Image src={products} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>PRODUCT LIST</Card.Header>
                        <Card.Meta>
                            <span className='date'>CRUD of Products</span>
                        </Card.Meta>
                        <Card.Description>
                            YOU CAN CREATE, MODIFY AND DELETE ALL PRODUCTS.
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Link to="/admin/products" style={{textDecoration: 'none'}}>
                            <Icon name='add' />
                            GO NOW
                        </Link>
                        </Card.Content>
                    </Card>
                </Link>
                <Link to="/admin/categories" style={{textDecoration: 'none'}}>
                    <Card style={{margin: '1rem'}}>
                        <Image src={categories} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>CATEGORIES LIST</Card.Header>
                        <Card.Meta>
                            <span className='date'>CRUD of Categories</span>
                        </Card.Meta>
                        <Card.Description>
                            YOU CAN CREATE, MODIFY AND DELETE ALL CATEGORIES.
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Link to="/admin/categories" style={{textDecoration: 'none'}}>
                            <Icon name='add' />
                            GO NOW
                        </Link>
                        </Card.Content>
                    </Card>
                </Link>
                <Link to="/admin/orderlist" style={{textDecoration: 'none'}}>
                    <Card style={{margin: '1rem'}}>
                        <Image src={orderlist} wrapped ui={false} />
                        <Card.Content>
                        <Card.Header>ORDER LIST</Card.Header>
                        <Card.Meta>
                            <span className='date'>CRUD of Orders</span>
                        </Card.Meta>
                        <Card.Description>
                            YOU CAN CREATE, MODIFY AND DELETE ALL ORDERS.
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Link to="/admin/orderlist" style={{textDecoration: 'none'}}>
                            <Icon name='add' />
                            GO NOW
                        </Link>
                        </Card.Content>
                    </Card>
                </Link>
            </Card.Group>
        </Container>
    )
}

export default Admin;



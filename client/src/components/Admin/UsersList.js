import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { deleteUser, getUsers, promoteUser } from '../../redux/actions/users';
import store from '../../redux/store/index';
import Swal from 'sweetalert2'

const UsersList = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState();

    useEffect(() => {
        if (!users) {
            dispatch(getUsers());
            store.subscribe(() => setUsers(store.getState().users.data));
        }
    });

    const handlePromoteClick = (id, rol) => {
        if (rol == 'admin') {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Este usuario ya es administrador.',
            })
        } else {
            dispatch(promoteUser(id));
            return Swal.fire({
                icon: 'success',
                title: 'Promocion',
                text: 'Usuario promovido a administrador, exitosamente.',
            })
        }
    }

    const handleDeleteClick = (id) => {
        if (localStorage.getItem('idUser') == id) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puede eliminar su propio usuario, contactar al Root Admin',
            })
        } else {
            dispatch(deleteUser(id));
            return Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
                text: 'Usuario eliminado exitosamente',
            })
        }
    }

    return (
        <Container style={{ marginTop: '1.5rem' }}>
            <h2>Listado de Usuarios</h2>
            <Table compact celled definition>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id del usuario</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Apellido</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Cambiar a Admin</Table.HeaderCell>
                        <Table.HeaderCell>Eliminar el Usuario</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {users && users.length > 0 && users.map((user, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.lastName}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell><Button onClick={() => handlePromoteClick(user.id, user.rol)} size='small'>Promover</Button></Table.Cell>
                            <Table.Cell><Button onClick={() => handleDeleteClick(user.id)} size='small'>Eliminar</Button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Container>
    )
}

export default UsersList;

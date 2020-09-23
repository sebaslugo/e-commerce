import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles(() => ({
    head: {
        color: 'white',
        background: 'black',
        textAlign: 'center'
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const TableMaterial = (props) => {
    
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Producto</StyledTableCell>
                    <StyledTableCell>Fecha de Publicación</StyledTableCell>
                    <StyledTableCell>Cantidad de Stock</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map(elemento => (
                        <TableRow key={elemento.id}>
                            <TableCell><img src={elemento.imagen} alt="imagen" width="50px" height="50px"/>{"  ---   "}{elemento.video}</TableCell>
                            <TableCell align="center">{elemento.fecha}</TableCell>
                            <TableCell align="center">{elemento.visualizaciones}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableMaterial;
export  function agregarProducto (payload) {
    return {
        type:'AGREGAR_PRODUCTO',
        payload
    }
}

export function eliminarProducto (id) {
    return {
        type:'ELIMINAR_PRODUCTO',
        payload:id
    }
}

export function selectProducto (payload){
    return{
        type:'SELECT_PRODUCTO',
        payload
    }
}

export function editProducto (payload) {
    return {
        type: 'EDIT_PRODUCTO',
        payload
    }
}

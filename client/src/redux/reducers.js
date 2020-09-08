
const initialState = {
    productos:[{'productName':'carro','id':0}],
    productEdit: {},
    edit:false
};



const productos = (state = initialState,action) => {
    switch(action.type){
        case 'AGREGAR_PRODUCTO':
            return {
                ...state,
                productos:state.productos.concat(action.payload),
                edit:false
                
            }
        case 'ELIMINAR_PRODUCTO':
            return{
                ...state,
                productos:state.productos.filter(producto  => producto.id !== action.payload)
            }
        case 'SELECT_PRODUCTO':
            return{
                ...state,
                productEdit:action.payload,
                edit:true
            }


     
        default:
            return state;
    }
}

export default productos;
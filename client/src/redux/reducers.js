
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
                productos:state.productos.filter(producto =>{
                    if(producto.id === action.payload.id){
                        return producto                       
                    }
                })

            }
        case 'SELECT_PRODUCTO':
            return{
                ...state,
                productEdit:action.payload,
                edit:true
            }
        case 'EDIT_PRODUCTO':
                state.productos.map(producto => {
                    if(producto.id = action.payload.id){
                        var indice =state.indexof(producto)
                        state.producto = action.payload
                        /* producto = action.payload  */                            
                    }
                })
            return{
                ...state,
                edit:false,
                productos:state.productos                
                
            }
        default:
            return state;
    }
}

export default productos;
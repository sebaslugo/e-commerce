import React, { useState } from 'react';


function Categories(props) {
    const [categorie, setCategorie] = useState("");

    const handleCategorie = (e) => {
        setCategorie(e.target.value)

    }




    return (

        <form>
            <h1>Agregar Categoria</h1>
            <input onChange={handleCategorie} type="text" placeholder="Add categorie..."></input>
            <button>+</button>

        </form>

    )

}

export default Categories;


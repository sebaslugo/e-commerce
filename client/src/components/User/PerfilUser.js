import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./PerfilUser.css";
import logo from "../../assets/img/branding.jpg";
import { getOrden } from "../../redux/actions/orden";
import store from "../../redux/store/index";

function PerfilUser() {
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");
  const id = localStorage.getItem("idUser");
  const dispatch = useDispatch();
  const [ordenes, setOrdenes] = useState(store.getState);

  console.log(store.getState);
  useEffect(() => {
    dispatch(getOrden(id));
    store.subscribe(() => {
      setOrdenes(() => store.getState().orden.data);
    });
  }, {});


  console.log(ordenes);

  return (
    <div>
      <div className="perfil__parent">
        <div className="perfil__box-one">
          <h1>Perfil de Usuario</h1>
          <h5 className="color-secondary">Nombre y Apellido</h5>
          <h3>{fullName}</h3>
          <h5 className="color-secondary">E-mail</h5>
          <h3 htmlFor="email">{email}</h3>
          <div style={{ marginTop: "50px;" }}></div>
        </div>
        <div className="perfil__box-two">
          <div className="perfil__image">
            <Link to="/products">
              <img className="perfil__logo" src={logo} alt="" />
            </Link>
          </div>
        </div>
      </div>

      <div class="perfil__container">
        <table>
          <thead>
            <tr>
              <th>Numero de Orden</th>
              <th>Estado</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {ordenes.orden && <td> {ordenes.orden.id && ordenes.orden.user.id}</td>}
              {ordenes.orden && <td>{ordenes.orden.status && ordenes.orden.status}</td>}
              <td>
                <ul>
                  {ordenes.orden && ordenes.orden.products &&
                    ordenes.orden.products.map((producto, index) => (
                      <li key={index}>{producto.name}</li>
                    ))}
                </ul>
              </td>
              <td>
                {" "}
                <ul>
                  {ordenes.orden && ordenes.items &&
                    ordenes.items.map((producto, index) => (
                      <li key={index}>{producto.quantity}</li>
                    ))}
                </ul>
              </td>
              <td>
                {" "}
                <ul>
                  {ordenes.orden && ordenes.items &&
                    ordenes.items.map((producto, index) => (
                      <li key={index}>$ {producto.price}</li>
                    ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PerfilUser;

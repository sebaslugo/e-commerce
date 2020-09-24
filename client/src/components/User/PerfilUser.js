import React from "react";
import { Link } from "react-router-dom";
import "./PerfilUser.css";
import logo from "../../assets/img/branding.jpg";


function PerfilUser() {
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email")
  
  return (
    <div className="perfil">
      <Link to="/products">
        <img className="perfil__logo" src={logo} alt="" />
      </Link>
      <div className="perfil__container">
        <h1>Perfil de Usuario</h1>
        <form>
          <h5>Nombre y apellido</h5>
          <h3>{fullName}</h3>
          <h5>E-mail</h5>
          <h3 htmlFor="email">{email}</h3>
        </form>
        <Link to="/products" className="perfil__backtohome">
          <h5>SEGUIR COMPRANDO</h5>
        </Link>
      </div>
    </div>
  );
}

export default PerfilUser;

import React from "react";
import 'semantic-ui-css/semantic.min.css';
import '@material-ui/core/styles';
import { Route, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Producto from "./components/producto";
import ProducList from "./components/ProducList";
import FormCategories from "./components/FormCategories"
import Home from "./components/home";
import Header from "./components/Header";
import Orden from "./components/Orden"
import UserLogin from "./components/LoginUser";
import CreateUser from "./components/CreateUser";
import Results from './components/ResultsSearch';


const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg', 'https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg']

function App() {

  return (

    <Router>
      <div className="App">

        <Header />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/:category" component={Home}></Route>
        <Route exact path="/Producto/:id" component={Producto} />
        <Route exact path="/search/results" component={Results} />    
        <Route exact path="/Admin/products" component={ProducList} />
        <Route exact path="/Admin/categories" component={FormCategories} />
        <Route exact path="/Admin/order" component={Orden}/>
        <Route exact path="/Login/loginuser" component={UserLogin} />
        <Route exact path="/Login/createuser" component={CreateUser} />
      </div>

    </Router>
  );
}

export default App;

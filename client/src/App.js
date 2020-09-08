
import React,{useEffect,useState} from "react";

import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Producto from "./components/producto";
import ProducList from "./components/ProducList";
import FormCategories from "./components/FormCategories"
import Home from "./components/home";
import Header from "./components/Header";
import 'semantic-ui-css/semantic.min.css';
import  '@material-ui/core/styles';

const imagenes = ['https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg','https://i.pinimg.com/236x/b7/e3/8b/b7e38b7111481c2c72c98990ec3d3889.jpg']

function App() {
  

  return (
    
    <Router>
    <div className="App">

      <Header />
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/:category" component={Home}></Route>
      <Route exact path="/Producto/:id" render={() => ( <Producto price={2000} name={"camisa"} description={"hofsdfsd"} />)}/>    
      <Route exact path="/Admin/products" component={ProducList} />
      <Route exact path="/Admin/categories" component={FormCategories} />

    </div>

  </Router>
  );
}

export default App;

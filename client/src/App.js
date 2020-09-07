
import React from "react";

import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Producto from "./components/producto";
import ProducList from "./components/ProducList";
import FormCategories from "./components/FormCategories"
import home from "./components/home";
import Header from "./components/Header";
import 'semantic-ui-css/semantic.min.css';
import  '@material-ui/core/styles';






function App() {
  return (
    <Router>
    <div className="App">

      <Header />
      <Route exact path="/" component={home}></Route>
      <Route exact path="/:category" component={home}></Route>
      <Route exact path="/Producto/:id" render={() => ( <Producto price={2000} name={"camisa"} description={"hofsdfsd"} />)}/>    
      <Route exact path="/Admin/products" component={ProducList} />
      <Route exact path="/Admin/categories" component={FormCategories} />

    </div>

  </Router>
  );
}

export default App;

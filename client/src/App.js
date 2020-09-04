
import React from "react";

import "./App.css";
import { Route } from "react-router-dom";
import Producto from "./components/producto";
import ProducList from "./components/ProducList";
import home from "./components/home";
import Header from "./components/Header";
import 'semantic-ui-css/semantic.min.css';
import  '@material-ui/core/styles';






function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <Route exact path="/" component={home}></Route>
      <Route exact path="/:category" component={home}></Route>
      <Route exact path="/Admin/products" component={ProducList} />
    </div>
  );
}

export default App;

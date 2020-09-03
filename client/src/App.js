
import React from "react";

import "./App.css";
import { Route } from "react-router-dom";
import Home from "./components/home";
import Producto from "./components/producto";
import ProducList from "./components/ProducList";
import home from "./components/home";
import Header from "./components/Header";
import 'semantic-ui-css/semantic.min.css';





function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <hr></hr>
      <Route exact path="/" component={home}></Route>
      <Route
        exact
        path="/Producto"
        render={() => (
          <Producto price={2000} name={"camisa"} description={"hofsdfsd"} />
        )}
      />
      <Route exact path="/ProducList" component={ProducList} />
    </div>
  );
}

export default App;

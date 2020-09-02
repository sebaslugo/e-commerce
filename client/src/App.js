import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/home';
import Producto from './components/producto';
import ProducList from './components/ProducList'


function App() {
  return (
    <div className="App">
      <div>
        <h1>HENRY MERCH</h1>
      </div>
        <hr></hr>
      <Route exact path = '/' component={Home}/>
      <Route exact path = '/Producto' render={() => <Producto price={2000} name={'camisa'} description={'hofsdfsd'}/>}/>
      <Route exact path = '/ProducList' component={ProducList}/>
    </div>
  );
}

export default App;

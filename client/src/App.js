import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Home from '../src/components/home';
import Producto from '../src/components/producto';


function App() {
  return (
    <div className="App">
      <Route exact path = '/' component={Home}/>
      <Route exact path = '/Producto' render={() => <Producto price={2000} title={'camisa'} description={'hofsdfsd'}/>}/>
    </div>
  );
}

export default App;

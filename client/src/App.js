import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import Producto from './components/producto';
import ProducList from './components/ProducList'
import home from './components/Home'
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <div>
        <h1>HENRY MERCH</h1>
      </div>
        <hr></hr>
      <Route exact path = '/' component ={home}/>
      <Route exact path = '/Producto' render={() => <Producto price={2000} name={'camisa'} description={'hofsdfsd'}/>}/>
      <Route exact path = '/ProducList' component={ProducList}/>
    </div>
  );
}

export default App;

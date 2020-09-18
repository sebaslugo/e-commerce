import React from "react";
import 'semantic-ui-css/semantic.min.css';
import '@material-ui/core/styles';
import { Provider } from 'react-redux';

import "./App.css";

import axios from 'axios'
import { AppRouter } from './routes/AppRouter';
import store from './redux/store';
axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('token')}` }

function App() {

  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}

export default App;

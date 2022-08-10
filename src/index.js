import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store,{persistor} from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import {PersistGate} from 'redux-persist/integration/react'
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
      
    </React.StrictMode>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

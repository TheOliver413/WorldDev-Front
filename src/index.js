import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store} >
      <App />
    </Provider> 
  </BrowserRouter>
);


/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  //App components 를  BrowserRouter로 감싸서 app 안에서 Router 기능을 활용하도록 함
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

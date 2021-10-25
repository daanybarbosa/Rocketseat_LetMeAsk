import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './App';


import './services/firebase'; // conectando ao firebase
import './styles/global.scss'; // importando o css/scss

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') 
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginRouter from './LoginRouter.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginRouter />
  </React.StrictMode>
);

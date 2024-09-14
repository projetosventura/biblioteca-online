import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Pegue o elemento root no DOM
const rootElement = document.getElementById('root');

// Use a nova API createRoot
const root = ReactDOM.createRoot(rootElement);

// Renderize o componente App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Se você quiser que seu aplicativo funcione offline e carregue mais rápido, você pode alterar
// unregister() para register() abaixo. Observe que isso pode trazer alguns problemas.
// Saiba mais sobre service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

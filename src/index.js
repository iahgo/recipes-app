import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import GlobalProvider from './Contexts/globalContext';

ReactDOM.render(
  <BrowserRouter>
    {/* <GlobalProvider> */}
    <App />
    {/* </GlobalProvider> */}
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();

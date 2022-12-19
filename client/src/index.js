import React from 'react';
import { CookiesProvider } from 'react-cookie';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);

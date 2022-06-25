import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import App from './App';

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

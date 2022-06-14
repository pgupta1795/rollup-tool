import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { CookiesProvider } from "react-cookie";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);

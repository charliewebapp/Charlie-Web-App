import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";
import Modal from "react-modal";

const DOMAIN_AUTH0 = import.meta.env.VITE_DOMAIN_AUTH0;
const CLIENTID_AUTH0 = import.meta.env.VITE_CLIENTID_AUTH0;
Modal.setAppElement("#root");

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain={DOMAIN_AUTH0}
        clientId={CLIENTID_AUTH0}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        onRedirectCallback={(state) => {
          // Utiliza el estado para redirigir a la ruta dinámica guardada
          window.location.replace(
            state && state.returnTo ? state.returnTo : window.location.pathname
          );
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>
);

// domain="dev-r2c57aspocton783.us.auth0.com"
// clientId="41MHPY5l4dp0DHdXUiRot5oNAm2R7tnq"

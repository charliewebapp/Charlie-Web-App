import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react"


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <Auth0Provider
//         domain="dev-foichedjpiga1cel.us.auth0.com"
//         clientId="bHiIxpyEHixnJ3Hx3CEjaE4rxeW6shnj"
//         authorizationParams={{
//           redirect_uri: window.location.origin
//         }}
//       >
//         <App />
//       </Auth0Provider>
//     </BrowserRouter>
//   </Provider>
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain="dev-foichedjpiga1cel.us.auth0.com"
        clientId="bHiIxpyEHixnJ3Hx3CEjaE4rxeW6shnj"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
        onRedirectCallback={(state) => {
          // Utiliza el estado para redirigir a la ruta dinámica guardada
          window.location.replace(state && state.returnTo ? state.returnTo : window.location.pathname);
        }}
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
);
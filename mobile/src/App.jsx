import { Routes, Route } from "react-router-dom";

import "./App.css";
import LoginUser from "./views/Users/LoginUser/LoginUser";
import Home from "./views/Users/Home/Home";
import Cards from "./views/Users/Cards/Cards";
import Profile from "./views/Users/Profile/Profile";
import Cart from "./views/Users/Cart/Cart";
import DetailQR from "./views/Users/DetailQR/DetailQR";
import OrderConfirmation from "./views/Users/OrderConfirmation/OrderConfirmation";

function App() {
  return (
    <>
      <Routes>
        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS USERS */}

        {/* / la NavBarUser -> iria en cada componente correspondiente*/}

        <Route path="/:clubName/login" element={<LoginUser />} />
        <Route
          path="/:clubName/home"
          element={<Home />}
        />
        <Route
          path="/:clubName/cards/:category"
          element={<Cards />}
        />
        <Route
          path="/:clubName/profile"
          element={<Profile />}
        />
        <Route path="/:clubName/detailqr" element={<DetailQR />} />
        <Route path="/:clubName/cart" element={<Cart />} />
        <Route path="/:clubName/orderConfirmation" element={<OrderConfirmation />} />





      </Routes>
    </>
  );
}

export default App;

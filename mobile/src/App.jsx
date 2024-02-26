import { Routes, Route } from "react-router-dom";

import "./App.css";
import LoginUser from "./views/Users/LoginUser/LoginUser";
import Home from "./views/Users/Home/Home";
import Cards from "./views/Users/Cards/Cards";
import Profile from "./views/Users/Profile/Profile";
import Cart from "./views/Users/Cart/Cart";
import DetailQR from "./views/Users/DetailQR/DetailQR";
import OrderRejected from './views/Users/Profile/OrderRejected';
import OrderConfirmation from "./views/Users/OrderConfirmation/OrderConfirmation";
import RedirectLogOut from "./views/Users/RedirectLogOut/RedirectLogOut";
import OrderDetail from "./views/Users/Profile/OrderDetail"

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
        <Route path="/:clubName/cart" element={<Cart />} />

        <Route path="/orderdetail/" element={<OrderDetail />} />



//!Ruta de prueba para el Profile
        <Route
          path="/:clubName/profile"
          element={<Profile />}
        />
        {/* <Route
          path="/profile"
          element={<Profile />}
        /> */}



        //!Ruta de prueba para el QR
        {/* <Route path="/:clubName/detailqr" element={<DetailQR />} /> */}
        <Route path="/detailqr" element={<DetailQR />} />




        //!Ruta de prueba para el OrderConfirmation
        <Route path="/:clubName/orderConfirmation" element={<OrderConfirmation />} />

        {/* <Route path="/orderConfirmation" element={<OrderConfirmation />} /> */}


        <Route path="/orderrejected" element={<OrderRejected />} />


        <Route path="/logout" element={<RedirectLogOut />} />




      </Routes>
    </>
  );
}

export default App;

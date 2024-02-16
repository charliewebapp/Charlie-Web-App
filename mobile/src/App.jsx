import { Routes, Route } from "react-router-dom";

import "./App.css";
import LoginUser from "./views/Users/LoginUser/LoginUser";
import Home from "./views/Users/Home/Home";
import Cards from "./views/Users/Cards/Cards";
import Profile from "./views/Users/Profile/Profile";
import Cart from "./views/Users/Cart/Cart";
import LoginCollab from "./views/Collaborators/LoginCollab/LoginCollab";
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
          path="/:clubName/home" //acá iría las cards con el nombre de las categorías
          element={<Home />}
        />
        <Route
          path="/:clubName/cards"
          element={<Cards />} // ACÁ IRIA MAPEADO CARD DENTRO DE CADA CARDS DE CATEGORÍAS
        />
        <Route
          path="/:clubName/profile" //capaz es necesario poner /:idUser
          element={<Profile />}
        />
        <Route path="/:clubName/detailqr" element={<DetailQR />} />
        <Route path="/:clubName/cart" element={<Cart />} />
        <Route path="/:clubName/orderConfirmation" element={<OrderConfirmation />} />

        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS COLLABORATORS */}
        <Route path="/:clubName/collab/login" element={<LoginCollab />} />



      </Routes>
    </>
  );
}

export default App;

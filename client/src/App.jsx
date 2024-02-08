import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import FormUpdateProductAdmin from "./views/Admin/FormUpdateProductAdmin/FormUpdateProductAdmin";
import DashboardAdmin from "./views/Admin/DashboardAdmin/DashboardAdmin";
import FormPostEmployee from "./views/Admin/FormPostEmployee/FormPostEmployee";
import FormClubProfile from "./views/Admin/FormClubProfile/FormClubProfile";
import LandingAdmin from "./views/Admin/LandingAdmin/LandingAdmin";
import FormPostProductAdmin from "./views/Admin/FormPostProductAdmin/FormPostProductAdmin";
import FormUpdateEmployee from "./views/Admin/FormUpdateEmployee/FormUpdateEmployee";

import DashboardSuperA from "./views/SuperAdmin/DashboardSuperA/DashboardSuperA";
import FormPostClubSuperA from "./views/SuperAdmin/FormPostClubSuperA/FormPostClubSuperA";
import Profile from "./views/Users/Profile/Profile";

const App = () => {
  return (
    <>
      <Routes>
        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS SUPERADMIN - agregar SuperA a cada component */}
        <Route
          path="/superadmin"
          // element={<LandingSuperA />} // aca va form login //Descomentar al crear
        />

        <Route
          path="/superadmin/dashboard"
          element={<DashboardSuperA />} // aca va form login
        />

        <Route
          // http://localhost:5173/superadmin/addclub
          path="/superadmin/addclub"
          element={<FormPostClubSuperA />} // AGREGA BOLICHE -> designar 1 solo usuario y contraseña de administrador
        />

        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS DEL ADMINISTRADOR */}
        <Route path="/admin" element={<LandingAdmin />} />

        {/* HACER UN GET AL BACK PARA NOMBRE DE BOLICHE */}
        <Route
          path="/admin/:clubName/dashbordAdmin"
          element={<DashboardAdmin />} //aca mismo lista VENTAS solo mostrar /PRODUCTOS (CRUD) / COLABORADORES(crea edita elimina)
        />

        <Route
          path="/admin/:clubName/addproduct"
          element={<FormPostProductAdmin />}
        />
        <Route
          path="/admin/:clubName/editproduct/:idProduct"
          element={<FormUpdateProductAdmin />}
        />

        <Route
          path="/admin/:clubName/addemployee"
          element={<FormPostEmployee />} //agrega mas administradores o colaboradores
        />

        <Route
          path="/admin/:clubName/updateemployee"
          element={<FormUpdateEmployee />}
        />

        <Route
          path="/admin/:clubName/clubprofile"
          element={<FormClubProfile />}
        />

        {/* ruta creada para brian test */}
        <Route path="/:clubName/profile" element={<Profile />} />
        {/*//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS USUARIOS -> los componentes no dicen user*/}
        {/* FALTAN IMPORTAR
        
        <Route
          path='/:clubName/home'
          element={<Home />}
        />
        ...FALTAN DEMAS RUTAS
        
        */}
      </Routes>
    </>
  );
};

export default App;

import "./App.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import FormUpdateProductAdmin from "./views/Admin/FormUpdateProductAdmin/FormUpdateProductAdmin";
import DashboardAdmin from "./views/Admin/DashboardAdmin/DashboardAdmin";
import FormPostEmployee from "./views/Admin/FormPostEmployee/FormPostEmployee";
import FormClubProfile from "./views/Admin/FormClubProfile/FormClubProfile";
import LandingAdmin from "./views/Admin/LandingAdmin/LandingAdmin";
import FormPostProductAdmin from "./views/Admin/FormPostProductAdmin/FormPostProductAdmin";
import FormUpdateEmployee from "./views/Admin/FormUpdateEmployee/FormUpdateEmployee";

import DashboardSuperA from "./views/SuperAdmin/DashboardSuperA/DashboardSuperA";
import FormPostClubSuperA from "./views/SuperAdmin/FormPostClubSuperA/FormPostClubSuperA";
import FormPostAdminSA from "./views/SuperAdmin/FormPostAdminSA/FormPostAdminSA";
import Profile from "./views/Users/Profile/Profile";

import LoginSuperA from "./views/SuperAdmin/LoginSuperA/LoginSuperA";

const EMAIL = "charlieapp@gmail.com";
const PASSWORD = "charlie123";

const App = () => {
  //LOGIN DE DANI COMENTADO PARA QUE FUNCIONEN LAS DEMAS RUTAS
  // const navigate = useNavigate();
  // const [access, setAccess] = useState(false);

  // function login(userData) {
  //   if (userData.password === PASSWORD && userData.email === EMAIL) {
  //     setAccess(true);
  //     navigate('/superadmin/dashboard');
  //   }
  // }

  // useEffect(() => {
  //   !access && navigate('/superadmin');
  // }, [access]);

  //!Login ADMIN

  const adminStatusLogin = useSelector((state) => state.adminStatusLogin);

  const requireAdminLogin = (component) => {
    return adminStatusLogin ? component : <Navigate to="/admin" />;
  };

  return (
    <>
      <Routes>
        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS SUPERADMIN - agregar SuperA a cada component */}
        {/* <Route
          path="/superadmin"
          element={<LoginSuperA login={login} />} // aca va form login //Descomentar al crear
        /> */}
        <Route
          path="/superadmin/dashboard"
          element={<DashboardSuperA />} // aca va form login
        />
        <Route
          // http://localhost:5173/superadmin/addclub
          path="/superadmin/addclub"
          element={<FormPostClubSuperA />} // AGREGA BOLICHE -> designar 1 solo usuario y contraseña de administrador
        />
        <Route
          // http://localhost:5173/superadmin/addadmin
          path="/superadmin/addadmin"
          element={<FormPostAdminSA />}
        />
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS DEL ADMINISTRADOR
        {/* <Route path="/admin" element={<LandingAdmin />} />

    
        <Route
          path="/admin/:clubName/dashbordAdmin"
          element={<DashboardAdmin />} 
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
          element={<FormPostEmployee />} 
        />

        <Route
          path="/admin/:clubName/updateemployee/:idCollaborator"
          element={<FormUpdateEmployee />}
        />

        <Route
          path="/admin/:clubName/clubprofile"
          element={<FormClubProfile />}
        /> */}
        <Route path="/admin" element={<LandingAdmin />} />
        <Route
          path="/admin/:clubName/dashboardAdmin"
          element={requireAdminLogin(<DashboardAdmin />)}
        />
        <Route
          path="/admin/:clubName/addproduct"
          element={requireAdminLogin(<FormPostProductAdmin />)}
        />
        <Route
          path="/admin/:clubName/editproduct/:idProduct"
          element={requireAdminLogin(<FormUpdateProductAdmin />)}
        />
        <Route
          path="/admin/:clubName/addemployee"
          element={requireAdminLogin(<FormPostEmployee />)}
        />
        <Route
          path="/admin/:clubName/updateemployee/:idCollaborator"
          element={requireAdminLogin(<FormUpdateEmployee />)}
        />
        <Route
          path="/admin/:clubName/clubprofile"
          element={requireAdminLogin(<FormClubProfile />)}
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

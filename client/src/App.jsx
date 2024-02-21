import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import FormUpdateProductAdmin from "./views/Admin/FormUpdateProductAdmin/FormUpdateProductAdmin";
import DashboardAdmin from "./views/Admin/DashboardAdmin/DashboardAdmin";
import FormPostEmployee from "./views/Admin/FormPostEmployee/FormPostEmployee";

import LandingAdmin from "./views/Admin/LandingAdmin/LandingAdmin";
import FormPostProductAdmin from "./views/Admin/FormPostProductAdmin/FormPostProductAdmin";
import FormUpdateEmployee from "./views/Admin/FormUpdateEmployee/FormUpdateEmployee";

import DashboardSuperA from "./views/SuperAdmin/DashboardSuperA/DashboardSuperA";
import FormPostClubSuperA from "./views/SuperAdmin/FormPostClubSuperA/FormPostClubSuperA";
import FormPostAdminSA from "./views/SuperAdmin/FormPostAdminSA/FormPostAdminSA";
import FormUpdateAdmin from "./views/SuperAdmin/FormUpdateAdmin/FormUpdateAdmin";
import FormUpdateClub from "./views/SuperAdmin/FormUpdateClub/FormUpdateClub";
import Profile from "./views/Users/Profile/Profile";

import ColaboradorNavbar from "./views/Colaborador/colaboradornavbar";
import DetailQR
  from "./views/Users/DetailQR/DetailQR";
import ColaboradorProfile from "./views/Colaborador/ColaboradorProfile"
import ColaboradorReader from "./views/Colaborador/ColaboradorReader"


import LoginSuperA from "./views/SuperAdmin/LoginSuperA/LoginSuperA";
import { handleSAdminStatusLogin } from "./redux/actions";

//no borrar esto
import FormClubProfile from "./views/Admin/FormClubProfile/FormClubProfile";
import DashboardAdminConfigSuccess from "./views/Admin/DashboardAdmin/DashboardAdminConfigSuccess";

const URL_EMAIL = import.meta.env.VITE_EMAIL;
const URL_PASSWORD = import.meta.env.VITE_PASSWORD;



const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  function login(userData) {
    if (userData.password === URL_PASSWORD && userData.email === URL_EMAIL) {
      dispatch(handleSAdminStatusLogin());
      navigate("/superadmin/dashboard");
    }
  }

  // useEffect(() => {
  //   !access && navigate('/superadmin');
  // }, [access]);

  //!Login ADMIN

  const sadminStatusLogin = useSelector((state) => state.sadminStatusLogin);

  const adminStatusLogin = useSelector((state) => state.adminStatusLogin);

  const colaboradorStatusLogin = useSelector((state) => state.colaboradorStatusLogin);

  const requireSAdminLogin = (component) => {
    return sadminStatusLogin ? component : <Navigate to="/superadmin" />;
  };

  const requireAdminLogin = (component) => {
    return adminStatusLogin ? component : <Navigate to="/admin" />;
  };

  const requireColaboradorLogin = (component) => {
    return colaboradorStatusLogin ? component : <Navigate to="/admin" />;
  };

  return (

    <>

      {location.pathname === "/colaborador/qr" || location.pathname === "/colaborador/perfil" ? <ColaboradorNavbar /> : null}

      <Routes>
        {/* //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! RUTAS SUPERADMIN - agregar SuperA a cada component */}
        <Route
          path="/superadmin"
          element={<LoginSuperA login={login} />} // aca va form login //Descomentar al crear
        />
        <Route
          path="/superadmin/dashboard"
          element={requireSAdminLogin(<DashboardSuperA />)} // aca va form login
        />
        <Route
          // http://localhost:5173/superadmin/addclub
          path="/superadmin/addclub"
          element={requireSAdminLogin(<FormPostClubSuperA />)} // AGREGA BOLICHE -> designar 1 solo usuario y contraseÃ±a de administrador
        />
        <Route
          // http://localhost:5173/superadmin/addadmin
          path="/superadmin/addadmin"
          element={requireSAdminLogin(<FormPostAdminSA />)}
        />
        <Route
          // http://localhost:5173/superadmin/updateadmin
          path="/superadmin/updateadmin/:idAdmin"
          element={requireSAdminLogin(<FormUpdateAdmin />)}
        />
        <Route
          // http://localhost:5173/superadmin/updateclub
          path="/superadmin/updateclub/:idClub"
          element={requireSAdminLogin(<FormUpdateClub />)}
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
          path="/admin/dashboardAdmin/mercadopago-authorization/success"
          element={requireAdminLogin(<DashboardAdminConfigSuccess location={window.location} />)}
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
        {/* <Route
          path="/admin/:clubName/clubprofile"
          element={requireAdminLogin(<FormClubProfile />)}
        /> */}
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



        <Route path="/qrcode" element={<DetailQR />} />

        <Route path="/colaborador/qr" element={requireColaboradorLogin(<ColaboradorReader />)} />

        <Route path="/colaborador/perfil" element={requireColaboradorLogin(<ColaboradorProfile />)} />


      </Routes>
    </>
  );
};

export default App;

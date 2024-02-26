import React from "react";
import style from "../../SuperAdmin/DashboardSuperA/dashboard.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateFormProductAdmin } from "../../../utils/validateFormProductAdmin";
import { postProduct } from "../../../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logotype from "../../../assets/img/charlielogo.png";
import imgCharlie from "../../../assets/img/charlie.png";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
// CATEGORIAS
const categories = [
  "Tragos",
  "Cervezas",
  "Botellas",
  "Vinos",
  "Shots",
  "Sin Alcohol",
];

function FormPostProductAdmin() {
  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);
  const allProductsState = useSelector((state) => state.allProducts);

  //local state for input
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    image: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  //local state errors
  const [errors, setErrors] = useState({
    name: "*",
    brand: "",
    image: "",
    description: "",
    price: "*",
    stock: "*",
    category: "*",
  });

  //onChange inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormProductAdmin(updatedData));

      //avoid repeted names
      const repetedName = allProductsState.find(
        (product) =>
          product.name.toLowerCase() === updatedData.name.toLowerCase()
      );
      if (repetedName !== undefined) {
        setErrors({ ...errors, name: "Este nombre de producto ya existe" });
      }

      return updatedData;
    });
  };

  // SUBMIT
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(postProduct(productData, clubName));
      setProductData({
        name: "",
        brand: "",
        image: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      Swal.fire({
        title: "Éxito",
        text: "El producto se agregó correctamente",
        icon: "success",
        timer: "3000",
        confirmButtonColor: "rgb(187, 131, 43)",
      });
    } catch (error) {
      //El sweet de error viene de actions
      console.log(error.message);
    }
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.aside}>
          <img src={logotype} className={style.asideLogo} />
          <div className={style.logotype}>
            <img src={logotype} className={style.logo} />
            CHARLIE
          </div>
          <div className={style.buttones}>
            <Link to={`/admin/${clubName}/dashboardAdmin`}>
              <button className={style.button}>
                <FaArrowLeft />
              </button>
            </Link>
          </div>
        </div>
        <div className={style.views}>
          <div className={style.navbar}>
            <h1 className={style.h1}>DASHBOARD ADMIN</h1>
          </div>
          <div className={style.dashboard}>
            <h2>CREAR PRODUCTO</h2>
            <form onSubmit={handleSubmit} className={style.FormPostAdminSA}>
              <label htmlFor="name"> Bebida: </label>
              <input
                type="text"
                id="name"
                key="name"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
              <span>{errors.name ? errors.name : null} </span>

              <label htmlFor="description"> Descripción: </label>
              <input
                type="text"
                id="description"
                key="description"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
              <span>{errors.description ? errors.description : null} </span>

              <label htmlFor="price"> Precio: </label>
              <input
                type="text"
                id="price"
                key="price"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
              <span>{errors.price ? errors.price : null} </span>

              <label htmlFor="category"> Categoría: </label>
              <select
                name="category"
                id="category"
                onChange={handleChange}
                value={productData.category}
              >
                <option value="" disabled hidden>
                  Seleccione una categoría
                </option>
                {categories &&
                  categories.map((category, index) => (
                    <option value={category} key={index}>
                      {" "}
                      {category}{" "}
                    </option>
                  ))}
              </select>
              <span> {errors.category ? errors.category : null} </span>

              <label htmlFor="stock"> Stock: </label>
              <select
                name="stock"
                id="stock"
                onChange={handleChange}
                value={productData.stock}
              >
                <option value="" disabled hidden>
                  Seleccione el stock
                </option>
                <option value="available"> DISPONIBLE </option>
                <option value="notavailable"> NO HAY STOCK DISPONIBLE </option>
              </select>
              <span> {errors.stock ? errors.stock : null} </span>

              <button
                className={style.btnForms}
                type="submit"
                disabled={Object.values(errors).some(
                  (error) => error && error.length > 0
                )}
              >
                AGREGAR PRODUCTO
              </button>
            </form>

            <img src={imgCharlie} className={style.imgCharlie}></img>
          </div>

          <div className={style.footer}>© Charlie</div>
        </div>
      </div>
    </div>
  );
}

export default FormPostProductAdmin;

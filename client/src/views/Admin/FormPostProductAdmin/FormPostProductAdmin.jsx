import React from "react";
import style from "./formpostproductAdmin.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateFormProductAdmin } from "../../../utils/validateFormProductAdmin";
import { postProduct } from "../../../redux/actions";
import { useNavigate, Link } from "react-router-dom";

//! CATEGORIAS -> VER SI LO DEJAMOS EN REDUX O EN UTILS para mapear -> en select
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
  //! const productsState = useSelector(state => state.products) para consultar nombres no repetidos

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
    name: "Ingrese el nombre del producto",
    brand: "",
    image: "",
    description: "Ingrese una descripción del producto",
    price: "Ingrese el precio",
    stock: "Seleccione el stock",
    category: "Seleccione una categoría",
  });

  //onChange inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormProductAdmin(updatedData));

      //!avoid repeted names -> ver despues al hacer get products por consulta estado de redux
      // const repetedName = productsState.find(product => product.name.toLowerCase() === updatedData.name.toLowerCase());
      // if (repetedName !== undefined) {
      //     setErrors({ ...errors, name: "Este nombre de producto ya existe" });
      // }

      console.log(updatedData);
      return updatedData;
    });
  };

  //! SUBMIT-> falta hacer actions y redux
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(postProduct(productData));
      window.alert("Producto agregado");
      setProductData({
        name: "",
        brand: "",
        image: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
    } catch (error) {
      window.alert("No se ha creado el producto. Intente nuevamente");
    }
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <h2>Agregar Nuevo Producto </h2>

      <label htmlFor="name"> Bebida: </label>
      <input
        type="text"
        id="name"
        key="name"
        name="name"
        value={productData.name}
        onChange={handleChange}
      />
      <p>{errors.name ? errors.name : null} </p>

      <label htmlFor="brand"> Marca: </label>
      <input
        type="text"
        id="brand"
        key="brand"
        name="brand"
        value={productData.brand}
        onChange={handleChange}
      />
      <p>{errors.brand ? errors.brand : null} </p>

      <label htmlFor="image"> Imagen: </label>
      <input
        type="text"
        id="image"
        key="image"
        name="image"
        value={productData.image}
        onChange={handleChange}
      />
      <p>{errors.image ? errors.image : null} </p>

      <label htmlFor="description"> Descripción: </label>
      <input
        type="text"
        id="description"
        key="description"
        name="description"
        value={productData.description}
        onChange={handleChange}
      />
      <p>{errors.description ? errors.description : null} </p>

      <label htmlFor="price"> Precio: </label>
      <input
        type="text"
        id="price"
        key="price"
        name="price"
        value={productData.price}
        onChange={handleChange}
      />
      <p>{errors.price ? errors.price : null} </p>

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
      <p> {errors.category ? errors.category : null} </p>

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
      <p> {errors.stock ? errors.stock : null} </p>

      <button
        type="submit"
        disabled={Object.values(errors).some(
          (error) => error && error.length > 0
        )}
      >
        {" "}
        AGREGAR PRODUCTO
      </button>
      <Link to={`/admin/testnati/dashbordAdmin`}>
        <button>Volver </button>
      </Link>
    </form>
  );
}

export default FormPostProductAdmin;

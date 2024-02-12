import React, { useEffect } from "react";
import style from "../Forms.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateFormProductAdmin } from "../../../utils/validateFormProductAdmin";
import { getProducts, updateProduct } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2"



// CATEGORIAS 
const categories = [
  "Tragos",
  "Cervezas",
  "Botellas",
  "Vinos",
  "Shots",
  "Sin Alcohol",
];

function FormUpdateProductAdmin() {

  const dispatch = useDispatch();
  const clubName = useSelector((state) => state.selectClientAdmin);
  const allProductsState = useSelector(state => state.allProducts)


  //Traer data del producto a editar
  const { idProduct } = useParams();
  const productToUpdate = allProductsState.find(
    (product) => product.id === idProduct
  );
  const [productData, setProductData] = useState({
    name: productToUpdate.name,
    brand: productToUpdate.brand,
    image: productToUpdate.image,
    description: productToUpdate.description,
    price: productToUpdate.price,
    stock: productToUpdate.stock,
    category: productToUpdate.category,
  });

  //para verificar nombre no repetidos salvo producto a editar
  const productsNotToUpdate = allProductsState.filter(
    (product) => product.id !== idProduct
  );


  //local state errors
  const [errors, setErrors] = useState({
    name: "",
    brand: "",
    image: "",
    description: "",
    price: "",
    stock: "Seleccione el stock",
    category: "Seleccione una categoría",
  });

  //onChange inputs
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setErrors(validateFormProductAdmin(updatedData));

      //Evita nombres repetidos salvo el producttoUpdate
      const repetedName = productsNotToUpdate.find(product => product.name.toLowerCase() === updatedData.name.toLowerCase());
      if (repetedName !== undefined) {
        setErrors({ ...errors, name: "Este nombre de producto ya existe" });
      }

      return updatedData;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(updateProduct(productData, idProduct, clubName));
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
        text: "El producto se editó correctamente",
        icon: "success",
        timer: "3000",
      })
    } catch (error) {
      //El sweet de error viene de actions
      console.log(error.message)
    }
  };

  return (
    <div className={style.formContainer}>
      <div>
        <h2>Editar Producto </h2>
        <Link to={`/admin/${clubName}/dashboardAdmin`}>
          <button>Volver </button>
        </Link>
      </div>


      <form onSubmit={handleSubmit}>

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
          EDITAR PRODUCTO
        </button>

      </form>
    </div>
  );
}

export default FormUpdateProductAdmin;

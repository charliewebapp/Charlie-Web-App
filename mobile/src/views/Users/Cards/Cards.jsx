import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../../../redux/actions";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import NavBarUser from "../NavBarUser/NavBarUser";
import { TiShoppingCart } from "react-icons/ti";

function Cards() {
  const { clubName } = useParams();
  let { category } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getProducts(clubName));
  }, [clubName, dispatch]);

  if (category === "sinalcohol") {
    category = "Sin Alcohol";
  }

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  const productsWithAvailableStock = filteredProducts.filter(
    (product) => product.stock === "available"
  );

  // Filtrar productos sin stock disponible
  const productsWithoutAvailableStock = filteredProducts.filter(
    (product) => product.stock !== "available"
  );

  // Concatenar los productos con stock disponible seguidos de los productos sin stock disponible
  const orderedFilteredProducts = [
    ...productsWithAvailableStock,
    ...productsWithoutAvailableStock,
  ];

  // Lógica para mostrar solo tres botones a la vez
  const categories = [
    "Tragos", //0
    "Cervezas", //1
    "Botellas", //2
    "Vinos", //3
    "Shots", //4
    "Sin Alcohol", //5
  ];

  // Encontrar el índice de la categoría actual
  const currentIndex = categories.indexOf(
    category.charAt(0).toUpperCase() + category.slice(1)
  );

  // Determinar las categorías previa, actual y siguiente
  let prevCategoryIndex =
    (currentIndex - 1 + categories.length) % categories.length;
  let nextCategoryIndex = (currentIndex + 1) % categories.length;

  // Ajustar para el ciclo circular
  if (prevCategoryIndex === -1) {
    prevCategoryIndex = categories.length - 1;
  }

  if (nextCategoryIndex === categories.length) {
    nextCategoryIndex = 0;
  }

  // Calcular el total de elementos en el carrito
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcular el total del carrito en precio
  const totalPriceInCart = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <NavBarUser />
      <div className={styles.carrousel}>
        <Link
          to={`/${clubName}/cards/${categories[prevCategoryIndex]
            .toLowerCase()
            .replace(/\s+/g, "")}`}
          className={styles.button}
        >
          {categories[prevCategoryIndex]}
        </Link>
        <span className={styles.span}>|</span>
        <Link
          to={`/${clubName}/cards/${categories[currentIndex]
            .toLowerCase()
            .replace(/\s+/g, "")}`}
          className={`${styles.button} ${styles.active}`}
        >
          {categories[currentIndex]}
        </Link>
        <span className={styles.span}>|</span>
        <Link
          to={`/${clubName}/cards/${categories[nextCategoryIndex]
            .toLowerCase()
            .replace(/\s+/g, "")}`}
          className={styles.button}
        >
          {categories[nextCategoryIndex]}
        </Link>
      </div>
      {orderedFilteredProducts.map((product, index) => (
        <Card
          key={index}
          id={product.id}
          stock={product.stock}
          name={product.name.toUpperCase()}
          price={product.price}
          description={product.description}
        />
      ))}
      <div className={styles.cart}>
        <Link to={`/${clubName}/cart`} className={styles.cartLink}>
          <TiShoppingCart size={24} />
          <div className={styles.cartItemTotalContainer}>
            <span className={styles.cartItemCount}>{totalItemsInCart}</span>
            <span className={styles.cartTotalPrice}>
              ${totalPriceInCart.toFixed(2)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Cards;

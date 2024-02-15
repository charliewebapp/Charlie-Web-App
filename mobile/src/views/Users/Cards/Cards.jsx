import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../redux/actions";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

function Cards() {
  const { clubName } = useParams();
  console.log("boliche", clubName);
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts(clubName));
  }, []);
  console.log("productos disponibles", allProducts);

  const [cart, setCart] = useState({});
  console.log("carrito", cart);

  return (
    <div className={styles.container}>
      {allProducts.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          stock={product.stock}
          name={product.name.toUpperCase()}
          price={product.price}
          description={product.description}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
}

export default Cards;

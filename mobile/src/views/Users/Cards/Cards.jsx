import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "../../../redux/actions";
import Card from "../Card/Card";
import styles from "./Cards.module.css";
import NavBarUser from "../NavBarUser/NavBarUser";

function Cards() {
  const { clubName } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getProducts(clubName));
  }, []);
  //   console.log("productos disponibles", allProducts);

  return (
    <div className={styles.container}>
      <NavBarUser />
      {allProducts.map((product, index) => (
        <Card
          key={index}
          id={product.id}
          stock={product.stock}
          name={product.name.toUpperCase()}
          price={product.price}
          description={product.description}
        />
      ))}
      <div>
        <Link to={`/${clubName}/cart`}>
          <button>Carrito</button>
        </Link>
      </div>
    </div>
  );
}

export default Cards;

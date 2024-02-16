import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardCart from "./CardCart";

function Cart() {
  const { clubName } = useParams();
  console.log("boliche", clubName);
  const cart = useSelector((state) => state.cart);
  console.log("carrito en Cart", cart); //VIENE VACIOOOOO

  const totalPriceCart = cart.reduce(
    (acc, product) => acc + product.price * product.cartQuantity,
    0
  );

  return (
    <div>
      <h1>Carrito</h1>
      {cart.map((product) => (
        <CardCart
          key={product.id}
          id={product.id}
          name={product.name.toUpperCase()}
          price={product.price}
          quantity={product.quantity}
          totalPrice={product.price * product.quantity}
        />
      ))}
      <button>Pagar {totalPriceCart}</button>
    </div>
  );
}

export default Cart;

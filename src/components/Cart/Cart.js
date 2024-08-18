import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  // const cartStatus = useSelector((state) => state.cart.cartStatus);

  // if (!cartStatus) {
  //   return null; // Don't render if cart is hidden
  // }

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;

import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../store/cartSlice';

const CartButton = () => {
  const dispatch = useDispatch();

  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
    </button>
  );
};

export default CartButton;

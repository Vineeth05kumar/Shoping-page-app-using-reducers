import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Cart from './components/Cart/Cart';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "./components/store/uiSlice"; // Correct the path to the store
import Notification from './components/UI/Notification';

function App() {
   const cartStatus = useSelector((state) => state.ui.cartIsVisible);
   const notification = useSelector((state) => state.ui.notification); // Select the notification state
   const cart  = useSelector(state => state.cart);
   const dispatch = useDispatch();

   useEffect(() => {
     const sendCartData = async () => {
       dispatch(uiActions.showNotification({
         status: 'pending',
         title: 'Sending...',
         message: 'Sending cart data!',
       }));
       const response = await fetch('https://react-http-3fc46-default-rtdb.firebaseio.com/cart.json', {
         method: 'PUT',
         body: JSON.stringify(cart),
       });

       if (!response.ok) {
         throw new Error('Sending cart data failed.');
       }

       dispatch(uiActions.showNotification({
         status: 'success',
         title: 'Success!',
         message: 'Sent cart data successfully!',
       }));
     };

     sendCartData().catch((error) => {
       dispatch(uiActions.showNotification({
         status: 'error',
         title: 'Error!',
         message: 'Sending cart data failed!',
       }));
     });
   }, [cart, dispatch]);

  return (
    <Layout>
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message} 
        />
      )}
      {cartStatus && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

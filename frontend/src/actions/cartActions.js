import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import axios from "axios";

/* getState gets our whole state tree and we can access any reducer as
    state.productList or
    state.productDetails or 
    state.cart 
*/
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    product: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  });

  //   save cart in local storage as json
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id, qty) => async (dispatch, getState) => {};

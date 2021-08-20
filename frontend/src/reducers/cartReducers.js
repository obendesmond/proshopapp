import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // check if same item is already in cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          // cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
          cartItems: state.cartItems.map((x) =>
            x.product === item.product ? x : item
          ),
        };
      } else {
        return { ...state, cartItems: { ...state.cartItems, item } };
      }
    case CART_REMOVE_ITEM:
      return state;

    default:
      return state;
  }
};

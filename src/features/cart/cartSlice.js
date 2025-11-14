import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload); // payload needs to be newItem
    },
    deleteItem(state, action) {
      // filters out the state cart array for any items where the id doesnt match the one wanting to be deleted
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // find the item in the cart matching id, and increase quantity
      // then calculate total price from derived state
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // find the item in the cart matching id, and increase quantity
      // then calculate total price from derived state
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = []; // reset the cart back to nothing, empty array
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

/* Originally used in the CartOverview file, but redux recommends putting it here in the cart slice file
because you may need to reuse this funciton somewhere else.
These functions access the store cart reducer and return stuff related to the cart state */
export const getTotalCartQuantity = (state) =>
  // Reduce by iterating through each item in cart and adding 1 to sum, starting at 0 initial value
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  // Reduce by iterating through each item in cart and adding 1 to sum, starting at 0 initial value
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  // nullish-coalescing returns o when .quantity is undefined or item isnt found
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

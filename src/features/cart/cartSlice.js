import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart: [],

  cart: [
    {
      pizzaId: 12,
      name: "mediterranean",
      quantity: 12,
      unitPrice: 16,
      totalPrice: 32,
    },
  ],
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

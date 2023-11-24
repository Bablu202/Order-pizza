import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};
//{pizzaid:10, name:'Primitivo', quantity:2, unitPrice:8, totalPrice:16}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload -- push newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload -- remove by pizzaId

      state.cart = state.cart.filter((e) => e.pizzaId !== action.payload);
    },
    increateItemQuantity(state, action) {
      //payload -- add one  by PizzaId

      const item = state.cart.find((e) => e.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //payload -- subtract one  by PizzaId

      const item = state.cart.find((e) => e.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increateItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getUserName = (state) => state.user.username;

export const getCart = (state) => state.cart.cart;

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
//redux 'reselect' for optimizatation

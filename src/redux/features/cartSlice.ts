import { DBC_Product } from "@/dbClassesInterfaces";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartElement {
  product_id: String;
  name: String;
  imageRoute: String;
  amount: Number;
  price: Number;
}

export interface CartState {
  arrCart: Array<CartElement>;
}

const initialState: CartState = {
  arrCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartElement>) => {
      state.arrCart.push({
        product_id: action.payload.product_id,
        name: action.payload.name,
        imageRoute: action.payload.imageRoute,
        amount: action.payload.amount,
        price: action.payload.price
      });
    },
    removeProduct: (state, action: PayloadAction<String>) => {
      state.arrCart = state.arrCart.filter(
        (cart_element) => cart_element.product_id !== action.payload
      );
    },
    incrementAmountOfProduct: (state, action: PayloadAction<String>) => {
      const prodIdx = state.arrCart.findIndex(
        (cart_element) => cart_element.product_id === action.payload
      );

      if (prodIdx !== -1) {
        state.arrCart[prodIdx].amount =
          Number(state.arrCart[prodIdx].amount) + 1;
      }
    },
    decrementAmountOfProduct: (state, action: PayloadAction<String>) => {
      const prodIdx = state.arrCart.findIndex(
        (cart_element) => cart_element.product_id === action.payload
      );

      if (prodIdx !== -1) {
        if (Number(state.arrCart[prodIdx].amount) > 1) {
          state.arrCart[prodIdx].amount =
            Number(state.arrCart[prodIdx].amount) - 1;
        }
      }
    },

    resetCart: (state) => {
      state.arrCart = [];
    }
  },
});

export default cartSlice.reducer;

export const {
  addProduct,
  removeProduct,
  decrementAmountOfProduct,
  incrementAmountOfProduct,
  resetCart
} = cartSlice.actions;

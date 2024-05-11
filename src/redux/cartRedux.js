import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity
        state.products[existingProductIndex].quantity += action.payload.quantity;
      } else {
        // Otherwise, add the new product
        state.products.push(action.payload);
      }

      // Update total
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      const productToRemove = state.products.find(
        (product) => product._id === productIdToRemove
      );

      if (productToRemove) {
        state.products = state.products.filter(
          (product) => product._id !== productIdToRemove
        );

        state.total -= productToRemove.price * productToRemove.quantity;
      }
    },
  },
});

// cartRedux.js

const initialState = {
    // other initial states
    total: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REMOVE_PRODUCT':
        // your existing logic
      case 'UPDATE_TOTAL':
        return {
          ...state,
          total: action.payload,
        };
      default:
        return state;
    }
  };
  
  
  
export const updateTotal = (total) => ({
    type: 'UPDATE_TOTAL',
    payload: total,
  });

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;

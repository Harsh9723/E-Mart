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
    updateTotal: (state, action) => {
      state.total = action.payload;
    },
    updateProductQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.products.find((product) => product._id === productId);

      if (productToUpdate) {
        // Update product quantity
        productToUpdate.quantity = newQuantity;

        // Update total
        state.total = state.products.reduce((acc, product) => {
          return acc + product.price * product.quantity;
        }, 0);
      }
    },
  },
});

export const { addProduct, removeProduct, updateTotal, updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;

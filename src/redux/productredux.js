  import {createSlice} from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: "product",
    initialState : {
        products: [],
        isFetching: false,
        error: false
    },
    reducers:{
        // Get All
        getproductStart:(state) => {
            state.isFetching = true;
            state.error = false
        },

        getproductSuccess:(state, action) => {
            state.isFetching =false;
            state.error = false
        },
        getproductFailure:(state) => {
            state.isFetching =false;
            state.error = true
        },

         // Delete
         deleteproductStart:(state) => {
            state.isFetching = true;
            state.error = false
        },

        deleteproductSuccess:(state, action) => {
            state.isFetching =false;
            state.products.splice(
                state.products.findIndex(item =>  item._id === action.payload), 1
            )
        },
        deleteproductFailure:(state) => {
            state.isFetching =false;
            state.error = true
        },
          // update
          updateproductStart:(state) => {
          state.isFetching = true;
            state.error = false
        },

        updateproductSuccess:(state, action) => {
            state.isFetching =false;
            state.products[state.products.findIndex((item) => item._id === action.payload._id)] = action.payload.product;
        },
        updateproductFailure:(state) => {
            state.isFetching =false;
            state.error = true
        },
          // ADD
          addproductStart:(state) => {
            state.isFetching = true;
              state.error = false
          },
  
          addproductSuccess:(state, action) => {
              state.isFetching =false;
              state.products.push(action.payload)
          },
          addproductFailure:(state) => {
              state.isFetching =false;
              state.error = true
          }
    }
})
export const { getproductFailure, getproductSuccess , getproductStart, 
    deleteproductFailure,deleteproductStart, deleteproductSuccess,
    updateproductFailure,updateproductSuccess,updateproductStart,
    addproductFailure,addproductStart,addproductSuccess

} = productSlice.actions;

export  default productSlice.reducer;
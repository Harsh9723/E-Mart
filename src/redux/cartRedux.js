// cartRedux.js

// Action types
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const UPDATE_TOTAL = 'UPDATE_TOTAL';

// Action creators
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const updateTotal = (total) => ({   // Export the updateTotal function
  type: UPDATE_TOTAL,
  payload: total,
});

// Reducer
const initialState = {
  products: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== action.payload),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload.productId
            ? { ...product, quantity: action.payload.quantity }
            : product
        ),
      };
    case UPDATE_TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

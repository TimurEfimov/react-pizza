import { createSlice } from "@reduxjs/toolkit";

const totalValues = (state) => {
  state.totalPrice = state.items.reduce(
    (sum, obj) => obj.price * obj.count + sum,
    0
  );
  state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
};

const removeItem = (items, action) => {
  return items.filter((obj) => obj.id !== action.payload);
};

const initialState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      totalValues(state);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count === 1) {
          state.items = removeItem(state.items, action);
        } else {
          findItem.count--;
        }
      }

      totalValues(state);
    },
    removeProduct(state, action) {
      state.items = removeItem(state.items, action);
      totalValues(state);
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addProduct, removeProduct, minusItem, clearProducts } =
  cartSlice.actions;

export default cartSlice.reducer;

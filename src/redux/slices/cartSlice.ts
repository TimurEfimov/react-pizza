import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

const totalValues = (state: CartSliceState) => {
  state.totalPrice = state.items.reduce(
    (sum, obj) => obj.price * obj.count + sum,
    0
  );
  state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
};

const removeItem = (items: CartItem[], id: number) => {
  return items.filter((obj) => obj.id !== id);
};

export type CartItem = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  totalCount: number;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<CartItem>) {
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
    minusProduct(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count === 1) {
          state.items = removeItem(state.items, action.payload);
        } else {
          findItem.count--;
        }
      }

      totalValues(state);
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.items = removeItem(state.items, action.payload);
      totalValues(state);
    },
    clearProducts(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addProduct, removeProduct, minusProduct, clearProducts } =
  cartSlice.actions;

export default cartSlice.reducer;

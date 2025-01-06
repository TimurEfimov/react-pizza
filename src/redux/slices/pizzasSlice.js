import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { category, search, sortBy, currentPage } = params;

    const { data } = await axios.get(
      `https://e0f09f95f87ac222.mokky.dev/pizzas?page=${currentPage}&limit=8${category}${sortBy}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  pages: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.pages = [];
        state.items = [];
      })

      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.pages = action.payload.meta;
        state.status = "success";
      })

      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.pages = [];
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

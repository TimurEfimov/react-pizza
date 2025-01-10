import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: number;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type paramsFilter = {
  category: string;
  search: string;
  sortBy: string;
  currentPage: number;
};

type Meta = {
  per_page: number;
  current_page: number;
  total_pages: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
  pages: Meta;
}

export const fetchPizzas = createAsyncThunk<
  { items: Pizza[]; meta: Meta },
  paramsFilter
>("pizza/fetchPizzasStatus", async (params) => {
  const { category, search, sortBy, currentPage } = params;

  const { data } = await axios.get(
    `https://e0f09f95f87ac222.mokky.dev/pizzas?page=${currentPage}&limit=8${category}${sortBy}${search}`
  );
  return data;
});

const initialState: PizzaSliceState = {
  items: [],
  pages: { per_page: 0, current_page: 0, total_pages: 0 },
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ items: Pizza[] }>) {
      state.items = action.payload.items;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.pages = { per_page: 0, current_page: 0, total_pages: 0 };
        state.items = [];
      })

      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<{ items: Pizza[]; meta: Meta }>) => {
          state.items = action.payload.items;
          state.pages = action.payload.meta;
          state.status = Status.SUCCESS;
        }
      )

      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.pages = { per_page: 0, current_page: 0, total_pages: 0 };
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../types/category.type";
import { getCategory } from "./appAsyncThunk";

type Type = {
  category: Category[];
  paymentResponse: any;
};

type GetCategoryPayload = {
  prodCategories: Category[];
};
const initialState: Type = {
  category: [],
  paymentResponse: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = (action.payload as unknown as GetCategoryPayload).prodCategories;
    });
  },
});

export const {} = appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;

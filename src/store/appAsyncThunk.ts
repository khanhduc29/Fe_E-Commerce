import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "../types/category.type";
import { apiNotToken } from "../api/api";

export const getCategory = createAsyncThunk(
  "app/getCategory",
  async (__: void, thunkApi) => {
    try {
      const res = await apiNotToken.get<Category[]>("/productcategory", {
        signal: thunkApi.signal,
      });

      return res.data;

    }catch(error) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue((error as any).response?.data || error.message);
      }
      return thunkApi.rejectWithValue(error);
    }
  }
);

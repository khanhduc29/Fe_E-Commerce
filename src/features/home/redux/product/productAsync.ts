import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiNotToken } from '../../../../api/api';
import { ProductItemType } from '../../types/product.types';

export const getProductList = createAsyncThunk(
  'products/getProductList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiNotToken.get<ProductItemType[]>('/product');
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

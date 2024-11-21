import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductItemType } from '../../types/product.types';
import { getProductList } from './productAsync';

type initialType = {
  listProducts: ProductItemType[];
  productByImg: ProductItemType[];
  isSearchProductByImg: boolean;
};

type getProductPayload ={
  products: ProductItemType[];
}

const initialState: initialType = {
  listProducts: [],
  productByImg: [],
  isSearchProductByImg: false
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductByImage: (state, action: PayloadAction<ProductItemType[]>) => {
      state.productByImg = action.payload
    },
    deleteProductByImage: (state) => {
      state.productByImg = []
    },
    enableSearchProductByImg: (state) => {
      state.isSearchProductByImg = true
    },
    disableSearchProductByImg: (state) => {
      state.isSearchProductByImg = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.listProducts = (action.payload as unknown as getProductPayload).products;
    });
  },
});

export const { getProductByImage, deleteProductByImage, enableSearchProductByImg, disableSearchProductByImg } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;

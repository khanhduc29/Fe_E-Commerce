import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import appReducer from './app.slice';
import { authReducer } from '../features/auth/redux/auth.slice';
import productReducer from '../features/home/redux/product/product.slice';

export const store = configureStore({
  reducer: { app: appReducer, auth: authReducer, product: productReducer },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const persistor = persistStore(store);

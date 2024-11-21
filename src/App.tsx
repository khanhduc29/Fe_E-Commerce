import './App.css';
import { useEffect } from 'react';
import { useAppDispatch } from './store/store';
import { getCategory } from './store/appAsyncThunk';
import 'regenerator-runtime/runtime';

import AppRoutes from './routes/AppRoutes';
import { getProductList } from './features/home/redux/product/productAsync';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(getCategory());
    dispatch(getProductList());
    return () => {
      promise.abort();
    };
  }, []);

  return <AppRoutes />;
}

export default App;

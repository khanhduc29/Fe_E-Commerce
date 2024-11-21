/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid2 } from '@mui/material';
import ProductItem from './ProductItem/ProductItem';
import { memo } from 'react';
import { ProductItemType } from '../../../features/home/types/product.types';


interface ProductsTabItemProps {
  products: ProductItemType[];
}

const ProductsTabItem = ({ products }: ProductsTabItemProps) => {
  return (
    <Grid2
      container
      columns={{ xs: 2, md: 4, lg: 5 }}
      marginTop={'10px'}
      spacing={2}
    >
      {products.map((product) => (
        <Grid2 size={1} key={product.id}>
          <ProductItem product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default memo(ProductsTabItem);

import { Grid2 } from '@mui/material';
import ProductItem from '../../ProductsHighlight/ProductsTabItem/ProductItem/ProductItem';
import { ProductItemType } from '../../../features/home/types/product.types';

interface ProductListProps {
  products: ProductItemType[];
  isWishlist?: boolean;
}

const ProductsList = ({ products, isWishlist = false }: ProductListProps) => {
  
  return (
    <>
      {products && products.map((product) => (
        <Grid2 size={1} key={product.id}>
          <ProductItem product={product} isWishlist={isWishlist} />
        </Grid2>
      ))}
      {products.length === 0 && <Grid2 size={{ xs: 2, md: 4, lg: 5 }} sx={{ flex: 1 }} alignItems={'center'} justifyContent={'center'} textAlign={'center'}>No products found</Grid2>}
    </>
  );
};

export default ProductsList;

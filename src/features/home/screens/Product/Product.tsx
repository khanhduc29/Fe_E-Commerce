import { Grid2 } from '@mui/material';
import Products from '../../../../components/Products/Products';
import { Row } from 'antd';

const Product = () => {
  return (
    <Row className='background-not-white'>
      <Grid2 container className="container" sx={{ m: '20px auto 28px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <Products />
      </Grid2>
    </Row>
  );
};

export default Product;

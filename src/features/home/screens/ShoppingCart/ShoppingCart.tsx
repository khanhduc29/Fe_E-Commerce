import { Grid2, useMediaQuery } from '@mui/material';
import CartTitle from './components/CartTitle';
import CartItemLargeView from './components/CartItemLargeView';
import NoteForOrder from './components/NoteForOrder';
import FreeShipcongrate from './components/FreeShipcongrate';
import GetShipAndCheckout from './components/GetShipAndCheckout';
import NoItemCart from './components/NoItemCart';
import CartItemSmallView from './components/CartItemSmallView';
import { CartItem } from '../../types/cart.types';
import { useEffect, useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../../../store/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../../auth/redux/auth.slice';
import { Col, Row } from 'antd';

const ShoppingCart = () => {
  const mobileScreen = useMediaQuery('(max-width:599px)');
  const dispatch = useAppDispatch();

  const [subTotal, setSubTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const { cartItemLength } = useAppSelector((state: RootState) => state.auth);

  const fetchCartData = async () => {
    const response = await dispatch(getCurrentUser());
    unwrapResult(response);
    setCartData(response?.payload?.rs?.cart);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCartData().then(() => setIsLoading(false));
  }, []);
  // const productsData = useAppSelector(
  //   (state: RootState) => state?.product?.listProducts
  // );
  // const mergedData: ProductInCart[] =cartData?.map(itemA => {
  //   const productB = productsData.find(itemB => itemB.id === itemA.product);

  //   if (productB) {
  //     return {
  //       id: itemA.id,
  //       quantity: itemA.quantity,
  //       color: itemA.color,
  //       title: productB.title,
  //       price: productB.price,
  //       image: productB.images[0]
  //     };
  //   }
  //   return null;
  // }).filter(Boolean) as ProductInCart[];
  return (
    <Row className='background-not-white'>
      <Grid2 container className="container" sx={{ margin: '20px auto 28px' }}>
        {cartItemLength > 0 ? (
          <>
            <Row style={{ width: '100%', columnGap: 24 }}>
              <Col flex={1} style={{ borderTop: '1px dashed #636363', transform: 'translateY(50%)' }} ></Col>
              <Col>
                <CartTitle />
              </Col>
              <Col flex={1} style={{ borderTop: '1px dashed #636363', transform: 'translateY(50%)' }}></Col>
            </Row>

            <Grid2 size={{ lg: 7.5, xs: 12 }}>
              <>
                {mobileScreen ? isLoading ? <>Loading...</> : (
                  <CartItemSmallView
                    cartItems={cartData}
                    setSubTotal={setSubTotal}
                  />
                ) : isLoading ? <>Loading...</> : (
                  <CartItemLargeView
                    cartItems={cartData}
                    setSubTotal={setSubTotal}
                  />
                )}
                <NoteForOrder />
              </>
            </Grid2>
            <Grid2 size={0.5}></Grid2>
            <Grid2 size={{ lg: 4, xs: 12 }}>
              <>
                <FreeShipcongrate subTotal={subTotal} />
                <GetShipAndCheckout subTotal={subTotal} />
              </>
            </Grid2>
          </>
        ) : (
          <>
            <NoItemCart />
          </>
        )}
      </Grid2>
    </Row>
  );
};

export default ShoppingCart;

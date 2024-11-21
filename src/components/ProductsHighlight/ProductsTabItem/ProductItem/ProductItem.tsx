/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2,
  Radio,
  Rating,
  SnackbarCloseReason,
  Typography,
} from '@mui/material';
import slide3 from '../../../../assets/images/slider3-2.jpg';
import React from 'react';
import HoverTooltipButton from './HoverTooltipButton/HoverTooltipButton';
import {
  ArrowsRightLeftIcon,
  HeartIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { Heart } from '@phosphor-icons/react'
import { ProductItemType } from '../../../../features/home/types/product.types';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../../api/api';
import SnackbarAlert from '../../../ToastMessage/SnackbarAlert';
import { useAppDispatch } from '../../../../store/store';
import { getCurrentUser } from '../../../../features/auth/redux/auth.slice';
import { Row } from 'antd';

interface ProductItemProps {
  product: ProductItemType;
  isWishlist?: boolean;
}

const cardStyle = {
  border: '1px solid #e9e9e9',
  borderRadius: '6px',
  boxShadow: 'none',
  height: '100%',
  maxHeight: 400
};

const ProductItem = ({ product, isWishlist = false }: ProductItemProps) => {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const productDiscountStr = product?.discount ? `- ${product.discount}%` : 0;
  const img = slide3;
  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
    message: '',
  });

  const [selectedValue, setSelectedValue] = React.useState(
    product?.color?.split(' ')[0]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const addToCart = () => {
    api.put('/user/cart', { pid: product.id, quantity: 1, color: selectedValue })
      .then(() => {
        setOpenSnackbar({
          open: true,
          severity: 'success',
          message: 'Add to cart successfully',
        })
        dispatch(getCurrentUser())
      })
  };


  const addToWishlist = (id: string) => {
    api.put(`/wishlist/updateWishlist/${id}`)
      .then(() => {
        setOpenSnackbar({
          open: true,
          severity: 'success',
          message: isWishlist ? 'Remove product in wishlist successfully' : 'Add to wishlist successfully',
        })
        dispatch(getCurrentUser())
      })
  };

  const handleCompare = () => {
    console.log('Compare product id:', product.id);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({
      ...openSnackbar,
      open: false,
    });
  };

  const buttons = [
    <HoverTooltipButton
      key={0}
      onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addToCart();
      }}
      icon={<ShoppingBagIcon width={20} height={20} />}
    />,
    <HoverTooltipButton
      key={1}
      onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addToWishlist(product.id);
      }}
      icon={isWishlist ? <Heart size={20} weight='fill' style={{ color: '#f03333' }} /> : <HeartIcon width={20} height={20}  />}
    />,
    <HoverTooltipButton
      key={2}
      onClick={(e : React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleCompare();
      }}
      icon={<ArrowsRightLeftIcon width={20} height={20} />}
    />,
  ];

  return (
    <>
      <Card sx={cardStyle}>
        <CardActionArea
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            '&:hover': {
              '& .hoverGroup': {
                visibility: 'visible',
                animation: 'fadeIn 0.5s ease',
              },
            },
          }}
          disableRipple
          onClick={() => navigator(`/product/${product.slug}`)}
        >
          <Badge
            badgeContent={productDiscountStr}
            color="error"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            sx={{
              flex: 1,
              '& .MuiBadge-badge': {
                visibility: product?.discount ? 'visible' : 'hidden',
                fontSize: '10px',
                transform: 'none',
                left: '10px',
                top: '10px',
              },
            }}
          >
            <CardMedia
              component="img"
              sx={{ p: '10px', objectFit: 'cover' }}
              image={product?.thumb || product?.images?.[0] || img}
              alt="product-img"
            />
            <Grid2
              className="hoverGroup"
              container
              spacing={1}
              direction={'column'}
              sx={{
                display: 'flex',
                visibility: 'hidden',
                position: 'absolute',
                top: '10%',
                right: '10%',
                zIndex: 1,
                animation: 'fadeOut 0.5s ease',
                transition: 'all 0.5s ease',
              }}
            >
              {buttons}
            </Grid2>
          </Badge>
          <CardContent style={{ width: '100%', gap: 4, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Rating
                name="rating-star"
                value={product.totalRatings}
                readOnly
                sx={{ mr: '8px', fontSize: '16px' }}
              />
              <Typography
                variant="subtitle2"
                color="#636363"
                lineHeight={1.4}
                fontWeight={400}
              >
                ({product.ratings?.length || 0})
              </Typography>
            </Box>
            <Typography variant="h3" color="#636363" fontSize={'12px'}>
              {product.category}
            </Typography>
            <Typography variant="h2" color="#216fe6" fontSize={'14px'} fontWeight={500} style={{ textWrap: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} >
              {product.title}
            </Typography>
            <Typography variant="h2" color="#f03333" fontSize={'18px'} fontWeight={500}>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
            </Typography>
            <Row align={'middle'} justify={'start'} style={{ marginTop: 24, gap: 8 }} wrap={false}>
              {product?.color ? product.color.split(' ').map((color, index) => (
                <Radio
                  key={index}
                  {...controlProps(`${color}`)}
                  
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    p: 0,
                    '&.MuiRadio-root > span > svg:nth-of-type(1)': {
                      color: 'gray',
                    },
                    '&.MuiRadio-root > span > svg:nth-of-type(2)': {
                      color: color,
                      transform: 'scale(1.6)',
                    },
                    '&.MuiRadio-root.Mui-checked > span > svg:nth-of-type(1)': {
                      color: 'black',
                    },
                    '&.MuiRadio-root.Mui-checked > span > svg:nth-of-type(2)': {
                      color: color,
                    },
                  }}
                />
              )) : (
                <Radio
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    p: 0,
                    '&.MuiRadio-root > span > svg:nth-of-type(1)': {
                      color: 'gray',
                    },
                    '&.MuiRadio-root > span > svg:nth-of-type(2)': {
                      color: 'black',
                      transform: 'scale(1.6)',
                    },
                  }}
                />
              )}
            </Row>
          </CardContent>
        </CardActionArea>
    </Card>
    <SnackbarAlert
        open={openSnackbar.open}
        onClose={handleClose}
        message={openSnackbar.message}
        severity={openSnackbar.severity}
      />
    </>
  );
};

export default ProductItem;

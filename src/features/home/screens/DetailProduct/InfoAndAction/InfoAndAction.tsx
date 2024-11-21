/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircleIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { EyeIcon, FireIcon } from '@heroicons/react/24/solid';
import {
  Box,
  Button,
  Divider,
  Grid2,
  Link,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import banner8 from '../../../../../assets/images/banner-8.avif';
import { ProductItemType } from '../../../types/product.types';
import React, { useEffect } from 'react';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { api } from '../../../../../api/api';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

// const currencies = [
//   {
//     value: 'USD',
//     label: '$',
//   },
//   {
//     value: 'EUR',
//     label: '€',
//   },
//   {
//     value: 'BTC',
//     label: '฿',
//   },
//   {
//     value: 'JPY',
//     label: '¥',
//   },
// ];

interface InfoAndActionProps {
  product: ProductItemType | null;
}

const blue = {
  100: '#daecff',
  200: '#b6daff',
  300: '#66b2ff',
  400: '#3399ff',
  500: '#007fff',
  600: '#0072e5',
  700: '#0059B2',
  800: '#004c99',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledButton = styled('button')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
    border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`
);

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
);

const StyledInput = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`
);


const formatPriceToVND = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const InfoAndAction = ({ product }: InfoAndActionProps) => {
  const { t } = useTranslation();
  const [color, setColor] = React.useState<string | null>(
    product && product?.color?.split(' ')?.[0]
  );
  const [quantity, setQuantity] = React.useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage();

  const NumberInput = React.forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    return (
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInput,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: <PlusIcon width={20} height={20} />,
            className: 'increment',
          },
          decrementButton: {
            children: <MinusIcon width={20} height={20} />,
          },
        }}
        {...props}
        ref={ref}
      />
    );
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const handleChangeQuantity = (val: number | null) => {
    if (val) {
      setQuantity(val);
    } else {
      setQuantity(1);
    }
  };

  const handleAddToCart = (pid: string, quantity: number, color: string) => {
    if (product) {
      api.put('/user/cart', { pid, quantity, color }).then(() => {
        messageApi.open({
          type: 'success',
          style: { fontFamily: 'sans-serif' },
          content: t('add_to_cart_success'),
        })
      });
    }
  };

  const handleAddToWishlist = (pid: string) => {
    api.put(`/wishlist/updateWishlist/${pid}`).then(() => {
      messageApi.open({
        type: 'success',
        style: { fontFamily: 'sans-serif' },
        content: t('add_to_wishlist_success'),
      })
    });
  }

  useEffect(() => {
    if (product) {
      setColor(product?.color?.split(' ')?.[0]);
      setQuantity(1);
    }
  }, [product]);

  return (
    <Grid2 container size={12} spacing={6} position={'relative'}>
      <Grid2
        container
        size={{ xs: 12, md: 7 }}
        direction={'column'}
        spacing={2}
      >
        <Grid2 size={12}>
          <img
            src={product?.thumb || product?.images?.[0] || banner8}
            alt="product image detail"
            style={{ width: '100%' }}
          />
        </Grid2>
        <Grid2 container size={{ xs: 0, md: 12 }}>
          <Grid2 size={6}>
            <img
              src={product?.images?.[1] || banner8}
              alt="product image detail"
              style={{ width: '100%' }}
            />
          </Grid2>
          <Grid2 size={6}>
            <img
              src={product?.images?.[2] || banner8}
              alt="product image detail"
              style={{ width: '100%' }}
            />
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2
        size={{ xs: 12, md: 5 }}
        sx={{
          position: 'sticky',
          top: '200px',
          right: 0,
          zIndex: 999,
          height: '400px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: '24px',
            lineHeight: '28px',
            fontWeight: '600',
            color: '#000',
            textTransform: 'uppercase',
          }}
        >
          {product?.title}
        </Typography>
        <Typography
          sx={{
            fontSize: '13px',
            lineHeight: '19px',
            color: '#636363',
            margin: '10px 0',
          }}
        >
          {t('by')} &nbsp;
          <Link
            href={`/product/?category=${product?.category}`}
            color="#f03333"
            underline="none"
          >
            {product?.category}
          </Link>
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontSize: '24px',
            fontWeight: '600',
          }}
        >
          {formatPriceToVND(Number(product?.price))}
        </Typography>
        <Divider sx={{ m: '15px 0' }} />
        <Box sx={{ display: 'flex', mb: '15px' }}>
          <EyeIcon
            style={{ height: '20px', width: '20px', marginRight: '10px' }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: '13px',
              lineHeight: '19px',
              color: '#000',
              fontWeight: '500',
            }}
          >
            {t('viewed')} {product?.ratings?.length || 0} {t('times')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mb: '15px' }}>
          <FireIcon
            style={{
              height: '20px',
              width: '20px',
              marginRight: '10px',
              color: 'orange',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: '13px',
              lineHeight: '19px',
              color: '#f11e1e',
              fontWeight: '500',
            }}
          >
            {product?.sold} {t('sold_in_last_24_hours')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <CheckCircleIcon
            style={{
              height: '20px',
              width: '20px',
              marginRight: '10px',
              color: 'green',
            }}
          />
          <Typography
            variant="body1"
            sx={{
              fontSize: '13px',
              lineHeight: '19px',
              color: '#636363',
              fontWeight: '500',
            }}
          >
            {t('in_stock')}
          </Typography>
        </Box>

        <Divider sx={{ m: '15px 0' }} />
        <Typography sx={{ fontSize: '18px' }}>
          {t('color')}: &nbsp;
          <Typography
            component={'span'}
            sx={{ fontSize: '13px', color: '#636363', fontWeight: '500' }}
          >
            {' '}
            {product?.color?.split(' ')?.[0]}
          </Typography>
        </Typography>
        {product?.color && product.color.split(' ').length > 0 && (
          <TextField
            id="outlined-select-currency"
            select
            label={t('select')}
            sx={{ width: '100%', m: '10px 0' }}
            value={color}
            onChange={handleChange}
            // helperText="Please select your currency"
          >
            {product?.color?.split(' ')?.map((color, index) => (
              <MenuItem key={index} value={color}>
                {color}
              </MenuItem>
            ))}
          </TextField>
        )}
        {contextHolder}
        <Stack direction={'row'} alignItems={'center'}>
          <Box sx={{ mr: '15px' }}>
            <NumberInput
              min={1}
              max={99}
              value={quantity}
              onChange={(_, val) => handleChangeQuantity(val)}
            />
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#000',
              flex: 1,
              color: '#fff',
              textTransform: 'capitalize',
              padding: '10px 20px',
              margin: '10px 10px 10px 0',
              borderRadius: '25px',
              '&:hover': {
                backgroundColor: '#f03333',
              },
            }}
            onClick={() =>
              product && color && handleAddToCart(product.id, quantity, color)
            }
          >
            {t('add_to_cart')}
          </Button>
          <Box
            sx={{
              border: '1px solid #e1dfdf',
              height: '40px',
              width: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              color: '#000',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f03333',
                color: '#fff',
              },
            }}
          >
            <HeartIcon
              style={{
                height: '20px',
                width: '20px',
              }}
              onClick={() =>
                product && handleAddToWishlist(product.id)
              }
            />
          </Box>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default InfoAndAction;

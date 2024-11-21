import { useEffect } from 'react';
import {
  IconButton,
  Typography,
  Box,
  Tooltip,
  TextField,
  Stack,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import { CartItem } from '../../../types/cart.types';
import { api } from '../../../../../api/api';

type CartItemType = {
  cartItems: CartItem[];
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
};

const CartItemSmallView = ({ cartItems, setSubTotal }: CartItemType) => {
  useEffect(() => {
    const newSubTotal = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item?.product?.price;
    }, 0);
    setSubTotal(newSubTotal);
  }, [cartItems, setSubTotal]);

  const handleQuantityChange = (action: string, index: number) => {
    if (action === 'increase') {
      api.put(`/user/cart`, { pid: cartItems[index].product.id, quantity: cartItems[index].quantity + 1, color: cartItems[index].color })
        .then(() => window.location.reload());
    } else if (action === 'decrease' && cartItems[index].quantity > 1) {
      api.put(`/user/cart`, { pid: cartItems[index].product.id, quantity: cartItems[index].quantity - 1, color: cartItems[index].color })
        .then(() => window.location.reload());
    }
  };

  const handleChangeWithTyping = (value: string, index: number) => {
    const quantity = parseInt(value);
    if (quantity > 0) {
      api.put(`/user/cart`, { pid: cartItems[index].product.id, quantity: quantity, color: cartItems[index].color })
        .then(() => window.location.reload());
    } else {
      alert('Quantity must be greater than 0');
    }
  };

  const handleRemoveItem = (id: string) => {
    api.delete(`/user/remove-cart/?cartItemId=${id}`).then(() => window.location.reload());
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <>
      {cartItems.map((item, index) => (
        <Stack
          key={index}
          spacing={2}
          sx={{ border: '1px solid #63636363', padding: '20px' }}
        >
          <Box>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={item?.product?.thumb}
                height={100}
                width={100}
                alt="Pocket Drone"
                style={{ marginRight: '20px' }}
              />
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'inline-block',
                    fontWeight: '500',
                    fontSize: '12px',
                    lineHeight: '14px',
                    textTransform: 'uppercase',
                    textAlign: 'left',
                  }}
                >
                  {item?.product?.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '10px',
                    lineHeight: '15px',
                    textAlign: 'left',
                  }}
                >
                  Color: {item.color}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '13px',
                    lineHeight: '19.5px',
                    textAlign: 'left',
                  }}
                >
                  {formatter.format(item?.product?.price * item.quantity)}
                </Typography>
                <Tooltip title="Edit this item" arrow placement="right">
                  <PencilSquareIcon
                    style={{
                      marginTop: '10px',
                      height: '15px',
                      cursor: 'pointer',
                    }}
                  />
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Stack
            direction="row"
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #63636363',
                width: '120px',
                // margin: '0 auto',
              }}
            >
              <IconButton
                onClick={() => handleQuantityChange('decrease', index)}
                size="small"
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => handleChangeWithTyping(e.target.value, index)}
                size="small"
                variant="outlined"
                InputProps={{
                  style: { textAlign: 'center' },
                  inputMode: 'numeric',
                  inputProps: {
                    style: {
                      MozAppearance: 'textfield',
                    },
                  },
                  endAdornment: null,
                }}
                sx={{
                  width: 'auto',
                  borderRight: '1px solid #63636363',
                  borderLeft: '1px solid #63636363',
                  '& fieldset': {
                    border: 'none',
                  },
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                    textAlign: 'center',
                  },
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                  {
                    WebkitAppearance: 'none',
                    margin: 0,
                  },
                }}
              />
              <IconButton
                onClick={() => handleQuantityChange('increase', index)}
                size="small"
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ textAlign: 'center' }}> {formatter.format((item.quantity * item?.product?.price))} VND</Box>
            <Box
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <TrashIcon
                style={{ height: '20px' }}
                onClick={() => handleRemoveItem(item.id)}
              />
            </Box>
          </Stack>
        </Stack>
      ))}
    </>
  );
};

export default CartItemSmallView;

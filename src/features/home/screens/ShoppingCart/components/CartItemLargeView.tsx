import { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/outline';
import customStyles from './CartItemLargeView.styles';
import { CartItem } from '../../../types/cart.types';
import { api } from '../../../../../api/api';

type CartItemType = {
  cartItems: CartItem[];
  setSubTotal: React.Dispatch<React.SetStateAction<number>>;
};

const CartItemLargeView = ({ cartItems, setSubTotal }: CartItemType) => {
  useEffect(() => {
    // Tính tổng subTotal
    const newSubTotal = cartItems.reduce((acc, item) => {
      return acc + item.quantity * item.product.price;
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

  return (
    <TableContainer>
      <Table sx={{ borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={customStyles.box1}>
              Product
            </TableCell>
            <TableCell sx={customStyles.tableCell} >
              Quantity
            </TableCell>
            <TableCell sx={customStyles.tableCell}>
              Total
            </TableCell>
            <TableCell sx={customStyles.tableCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems?.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ ...customStyles.tableCell, textAlign: "left" }}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.product.thumb}
                    alt="Pocket Drone"
                    height={100}
                    width={100}
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
                      {item.product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '10px',
                        lineHeight: '15px',
                        textAlign: 'left',
                      }}
                    >
                      {item.color}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '13px',
                        lineHeight: '19.5px',
                        textAlign: 'left',
                      }}
                    >
                      {item.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
              </TableCell>
              <TableCell sx={{ border: '1px solid #63636363' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #63636363',
                    width: '120px',
                    margin: '0 auto',
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
              </TableCell>
              <TableCell
                sx={customStyles.tableCell}
              >
                {Number((item.quantity * item.product.price).toFixed(2)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </TableCell>
              <TableCell
                sx={{
                  border: '1px solid #63636363',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <TrashIcon
                  style={{ height: '20px' }}
                  onClick={() => handleRemoveItem(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemLargeView;

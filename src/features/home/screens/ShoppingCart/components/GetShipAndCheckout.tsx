import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Drawer } from 'antd';
import { api } from '../../../../../api/api';
import { OrderItemType } from '../../../types/order.types';
import customStyles from './CartItemLargeView.styles';
import { useTranslation } from 'react-i18next';

type PropTypes = {
  subTotal: number;
};

const GetShipAndCheckout = ({ subTotal }: PropTypes) => {
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState(false);
  const [openModalCheckout, setOpenModalCheckout] = React.useState(false);
  const [order, setOrder] = React.useState<OrderItemType | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModalCheckout = () => {
    setOpenModalCheckout(false);
  };

  const handleCheckout = () => {
    api.post('/order').then((res) => {
      setOrder(res.data?.createdOrder);
      setOpenModalCheckout(true);
    });
  };

  const handlePaymentWithOs = () => {
    console.log(order);
    
    if (order) {
      // dispatch(getPaymentResponse(order.id))
      //   .unwrap()
      //   .then((res) => {
      //     console.log(res);
          
      //     window.location.href = res.data?.paymentResponse?.checkoutUrl;
      //   })
      api.post('/order/createPayOsPayment', { orderId: order?.id }).then((res) => {
        window.location.href = res.data?.paymentResponse?.checkoutUrl;
      });

    }
  }

  return (
    <Stack
      spacing={5}
      sx={{ padding: '50px', backgroundColor: '#fff', marginTop: '20px' }}
    >
      <Stack>
        <Typography
          variant="subtitle2"
          sx={{
            lineHeight: '20px',
            fontSize: '13px',
            marginBottom: '10px',
            color: '#000',
          }}
        >
          {t('coupons')}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            lineHeight: '20px',
            fontSize: '13px',
            marginBottom: '10px',
            color: '#636363',
          }}
        >
          {t('discount_calculated_at_checkout')}
        </Typography>
        <TextField
          id="coupon"
          label=""
          placeholder="Coupon Code"
          variant="outlined"
          InputProps={{
            style: {
              height: '40px',
              outline: 'none',
              borderRadius: '0',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#f5f5f5',
              '&.Mui-focused fieldset': {
                borderColor: 'default',
              },
            },
          }}
        />
      </Stack>

      <Stack>
        <Typography
          variant="body2"
          sx={{
            lineHeight: '20px',
            fontSize: '13px',
            marginBottom: '10px',
            color: '#000',
            fontWeight: '500',
          }}
        >
          {t('subtotal')}: {subTotal.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            lineHeight: '20px',
            fontSize: '13px',
            marginBottom: '10px',
            color: '#636363',
            fontStyle: 'italic',
          }}
        >
          {t('taxes_and_shipping_calculated_at_checkout')}
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={
            <Typography
              sx={{ fontSize: '13px', lineHeight: '19.5px', color: '#636363' }}
            >
              {t('agree_with_terms')}
              <Typography
                onClick={handleClickOpen}
                component={'span'}
                sx={{
                  fontSize: '13px',
                  lineHeight: '19.5px',
                  color: '#000',
                  borderBottom: '1px solid #000',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    borderBottom: 'none',
                    color: '#f03333',
                    animation: 'borderBottomAnimation 0.3s linear',
                  },
                  '@keyframes borderBottomAnimation': {
                    '0%': {
                      borderBottom: '1px solid #000',
                    },
                    '100%': {
                      borderBottom: 'none',
                    },
                  },
                }}
              >
                {t('terms_and_conditions')}
              </Typography>
            </Typography>
          }
        />

        <Button
          variant="contained"
          onClick={() => handleCheckout()}
          disabled={!checked}
          sx={{
            backgroundColor: '#000',
            color: 'white',
            padding: '10px 40px',
            fontWeight: '500',
            fontSize: '11px',
            '&:hover': {
              backgroundColor: '#f03333',
            },
          }}
        >
          {t('checkout')}
        </Button>
      </Stack>
      <>
        <Drawer
          title={t('terms_and_conditions')}
          placement="right"
          onClose={handleClose}
          open={open}
          width={720}
        >
          <Typography
            gutterBottom
            sx={{ fontSize: '13px', lineHeight: '19.5px' }}
          >
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontSize: '13px', lineHeight: '19.5px' }}
          >
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontSize: '13px', lineHeight: '19.5px' }}
          >
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontSize: '13px', lineHeight: '19.5px' }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            adipisci. Reiciendis reprehenderit quo, odio sapiente quibusdam eos
            exercitationem veniam nostrum?
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontSize: '13px', lineHeight: '19.5px' }}
          >
            Sed posuere consectetur est at lobortis. Quisque velit nisi, pretium
            ut lacinia in, elementum id enim. Nullam id dolor id nibh ultricies
            vehicula ut id elit.
          </Typography>
        </Drawer>

        <Drawer
          title={t('pay_order', { id: order?.id })}
          placement="right"
          onClose={handleCloseModalCheckout}
          open={openModalCheckout}
          width={720}
        >
          <TableContainer>
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={customStyles.box1}>Product</TableCell>
                  <TableCell sx={customStyles.tableCell}>Quantity</TableCell>
                  <TableCell sx={customStyles.tableCell}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.products?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ ...customStyles.tableCell, textAlign: 'left' }}
                    >
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
                            {item.product.price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '120px',
                          margin: '0 auto',
                        }}
                      >
                        <TextField
                          type="number"
                          value={item.count}
                          disabled
                          size="small"
                          InputProps={{
                            style: { textAlign: 'center' },
                            inputMode: 'numeric',
                            endAdornment: null,
                          }}
                          sx={{
                            '& input[type=number]': {
                              textAlign: 'center',
                              color: '#000',
                            },
                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                              {
                                WebkitAppearance: 'none',
                                margin: 0,
                              },
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={customStyles.tableCell}>
                      {Number(
                        (item.count * item.product.price).toFixed(2)
                      ).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell sx={customStyles.tableCell} />
                  <TableCell sx={customStyles.tableCell}>Subtotal</TableCell>
                  <TableCell sx={customStyles.tableCell}>
                    {order?.total.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '24px',
              }}
            >
              <Button
                variant="contained"
                onClick={() => handlePaymentWithOs()}
                disabled={!checked}
                sx={{
                  backgroundColor: '#000',
                  color: 'white',
                  padding: '10px 40px',
                  fontWeight: '500',
                  fontSize: '11px',
                  '&:hover': {
                    backgroundColor: '#f03333',
                  },
                }}
              >
                {t('pay_with_payos')}
              </Button>
            </div>
          </TableContainer>
        </Drawer>
      </>
    </Stack>
  );
};

export default GetShipAndCheckout;

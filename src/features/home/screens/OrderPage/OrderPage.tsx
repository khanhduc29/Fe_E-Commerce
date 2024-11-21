/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { api } from '../../../../api/api.ts';
import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Image,
  Row,
  Table,
  TableProps,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import { createStyles } from 'antd-style';
import dayjs from 'dayjs';
import { BaseType } from 'antd/es/typography/Base/index';
import { useTranslation } from 'react-i18next';

const useStyle = createStyles(({ prefixCls, css }) => {
  return {
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(
          .${prefixCls}-btn-dangerous
        ) {
        border-width: 0;

        > span {
          position: relative;
        }

        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }

        &:hover::before {
          opacity: 0;
        }
      }
    `
  };
});

interface DataType {
  id: string;
  date: string;
  total: string;
  status: 'Succeeded' | 'Processing' | 'Cancelled';
  products: any[];
}

interface DataOrderToPay {
  product: any;
  color: string;
  count: string;
  total: string;
}

const { Text } = Typography;

const OrderPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderToPay, setOrderToPay] = useState<any | null>(null);
  const [openModalCheckout, setOpenModalCheckout] = useState(false);
  const { styles } = useStyle();
  const { t } = useTranslation();

  const columns: TableProps<DataType>['columns'] = [
    {
      title: t('order_id'),
      dataIndex: 'id',
      align: 'center',
      width: 100,
      // render: (text) => <a>{text}</a>,
      render: (_, __, idx) => (
        <Row align={'middle'} justify={'center'}>
          {idx + 1}
        </Row>
      ),
    },
    {
      title: t('time_created'),
      dataIndex: 'date',
      align: 'center',
      width: 130,
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
      // align: 'right',
    },
    {
      title: t('total'),
      dataIndex: 'total',
      align: 'center',
      width: 200,
      render: (total) => (
        <Text style={{ fontWeight: 600 }}>
          {total.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
      ),
      sorter: (a, b) => parseInt(a.total) - parseInt(b.total),
    },
    {
      title: t('status'),
      dataIndex: 'status',
      align: 'center',
      width: 130,
      render: (status) => {
        let color = 'geekblue';
        let type: BaseType = 'warning';
        if (status === 'Succeeded') {
          color = 'green';
          type = 'success';
        } else if (status === 'Processing') {
          color = 'geekblue';
          type = 'warning';
        } else {
          color = 'volcano';
          type = 'danger';
        }
        return (
          <Tag color={color}>
            <Text type={type} style={{ fontWeight: 600 }}>
              {status}
            </Text>
          </Tag>
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: t('products'),
      align: 'center',
      dataIndex: 'products',
      render: (products) => (
        <Row gutter={[8, 8]}>
          {products.map((product: any, index: number) => (
            <Tooltip
              key={index}
              color="#fff"
              title={
                <Row style={{ flexDirection: 'column' }}>
                  <Text style={{ fontWeight: 600 }}>
                    Title: {product.product.title}
                  </Text>
                  <Text style={{ color: `${product.color}` }}>
                    Color: {product.color}
                  </Text>
                  <Text style={{ fontWeight: 600 }}>
                    Price:{' '}
                    {product.product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </Text>
                </Row>
              }
            >
              <Col key={index} span={6} style={{ gap: 4 }}>
                <Image
                  style={{
                    maxHeight: '100%',
                    mixBlendMode: 'multiply',
                    borderRadius: 8,
                  }}
                  height={100}
                  width={'auto'}
                  src={product.product.thumb}
                  fallback="data:image/png;base64,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"
                />
                <Row align={'middle'} justify={'center'}>
                  <Text style={{ fontWeight: 600 }}>SL: {product.count}</Text>
                </Row>
              </Col>
            </Tooltip>
          ))}
        </Row>
      ),
    },
    {
      title: t('actions'),
      align: 'center',
      dataIndex: 'actions',
      width: 100,
      render: (_, record) => (
        <Button
          style={{ width: '100%' }}
          type="primary"
          disabled={record.status === 'Succeeded'}
          onClick={() => record.status !== 'Succeeded' && handlePayOrder(record)}
        >
          Pay
        </Button>
      ),
    },
  ];

  const columnsOrderToPay: TableProps<DataOrderToPay>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'product',
      width: 200,
      align: 'center',
      render: (product) => (
        <Row align={'middle'} justify={'center'}>
          <Image
            style={{
              maxHeight: '100%',
              mixBlendMode: 'multiply',
              borderRadius: 8,
            }}
            height={100}
            width={'auto'}
            src={product.thumb}
            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVd"
          />
        </Row>
      ),
    },
    {
      title: t('quantity'),
      dataIndex: 'count',
      width: 100,
      align: 'center',
      render: (count) => (
        <Row align={'middle'} justify={'center'}>
          <Text style={{ fontWeight: 600 }}>{count}</Text>
        </Row>
      ),
    },
    {
      title: t('color'),
      dataIndex: 'color',
      align: 'center',
      width: 100,
      render: (color) => (
        <Row align={'middle'} justify={'center'}>
          <Text style={{ fontWeight: 600 }}>{color}</Text>
        </Row>
      ),
    },
    {
      title: t('sub_total'),
      dataIndex: 'total',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Row align={'middle'} justify={'center'}>
          <Text style={{ fontWeight: 600 }}>
            {record.count &&
              (parseInt(record.count) * record.product.price).toLocaleString(
                'vi-VN',
                {
                  style: 'currency',
                  currency: 'VND',
                }
              )}
          </Text>
        </Row>
      ),
    },
  ];
  useEffect(() => {
    api.get('/order').then((res) => {
      console.log(res.data);

      setOrders(res.data?.response);
    });
  }, []);

  const handlePayOrder = (order: any) => {
    setOrderToPay(order);
    console.log(order);

    setOpenModalCheckout(true);
  };

  const handleCloseModalCheckout = () => {
    setOpenModalCheckout(false);
  };

  const handlePaymentWithOs = () => {
    if (orderToPay) {
      api
        .post('/order/createPayOsPayment', { orderId: orderToPay.id })
        .then((res) => {
          window.location.href = res.data?.paymentResponse?.checkoutUrl;
        });
    }
  };

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Row className='container' style={{ margin: '0 auto' }}>
        <Box sx={{ backgroundColor: '#fff', marginTop: '20px', marginBottom: '28px', width: '100%' }}>
          <Table
            columns={columns}
            dataSource={orders}
            bordered
            pagination={{ pageSize: 20 }}
            scroll={{ y: 700 }}
            title={() => <Row style={{ fontWeight: 600, width: '100%', gap: 20 }}>
              <Col flex={1} style={{ borderTop: '1px dashed #f0f0f0', transform: 'translateY(50%)' }}></Col>
              <Col flex={"none"} style={{ fontSize: 18 }}>{t('your_orders')}</Col>
              <Col flex={1} style={{ borderTop: '1px dashed #f0f0f0', transform: 'translateY(50%)' }}></Col>
            </Row>}
            footer={() => ''}
          />
        
          <Drawer
            title={<Text style={{ fontWeight: 600, fontSize: 18 }}>{t('pay_order', { id: orderToPay?.id })}</Text>}
            placement="right"
            onClose={handleCloseModalCheckout}
            open={openModalCheckout}
            width={720}
          >
            <Table
              columns={columnsOrderToPay}
              dataSource={orderToPay?.products}
              bordered
              pagination={false}
              scroll={{ y: 500 }}
              // title={() => `#${orderToPay?.id}`}
              footer={() => (
                <>
                  <Row align={'middle'} justify={'end'}>
                    <Text type="danger" style={{ fontWeight: 600 }}>
                      {t('total')}: {orderToPay?.total.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </Text>
                  </Row>
        
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '12px',
                    }}
                  >
                    <Button
                      onClick={() => handlePaymentWithOs()}
                      type="primary"
                      style={{
                        color: 'white',
                        fontWeight: '500',
                        height: 36
                      }}
                    >
                      {t('pay_with_payos')}
                    </Button>
                  </div>
                </>
              )}
            />
          </Drawer>
        </Box>
      </Row>
    </ConfigProvider>
  );
};

export default OrderPage;

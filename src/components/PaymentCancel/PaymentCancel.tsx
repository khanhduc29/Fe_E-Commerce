import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { Box, LinearProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { OrderItemType } from '../../features/home/types/order.types';
import { Button, Result, Row, Typography } from 'antd';
import { XCircle } from '@phosphor-icons/react';

const { Paragraph, Text } = Typography;
function PaymentCancel() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderItemType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // const code = params.get('code');
    // const id = params.get('id');
    // const cancel = params.get('cancel');
    // const status = params.get('status');
    // const orderCode = params.get('orderCode');
    const orderId = params.get('orderId');

    // console.log('code:', code);
    // console.log('id:', id);
    // console.log('cancel:', cancel);
    // console.log('status:', status);
    // console.log('orderCode:', orderCode);
    // console.log('orderId:', orderId);

    setLoading(true);
    api
      .put(`/order/status/${orderId}`, { status: 'Processing' })
      .then((res) => {
        setOrder(res.data?.response);
        setLoading(false);
      });
  }, [location]);

  return (
    <Box className="container">
      <ToastContainer />
      {loading ? (
        <LinearProgress />
      ) : (
        <Result
          status="error"
          title={`Payment failed for order ${order?.id}`}
          extra={[
            <Button type="primary" key="console" onClick={() => navigate('/')}>
              Go Home
            </Button>,
            <Button key="buy" onClick={() => navigate('/order')}>Buy Again</Button>,
          ]}
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                The content you submitted has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <Row align={'middle'} style={{ gap: 8 }}>
                <XCircle size={20} style={{ color: '#f03333' }} className="site-result-demo-error-icon" />{' '}
                You already cancel you order, but you can <a href='/order'>continue payment &gt;</a>
              </Row>
            </Paragraph>
            <Paragraph>
              <Row align={'middle'} style={{ gap: 8 }}>
                <XCircle size={20} style={{ color: '#f03333' }} className="site-result-demo-error-icon" />{' '}
                Your order is time out, you can{' '}
                <a href='/order'>continue pay your order &gt;</a>
              </Row>
            </Paragraph>
          </div>
        </Result>
      )}
    </Box>
  );
}

export default PaymentCancel;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../api/api";
import { Box, LinearProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { OrderItemType } from "../../features/home/types/order.types";
import OrderTableDemo from "../OrderTableDemo/OrderTableDemo";

function PaymentSuccess() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<OrderItemType | null>(null);

    console.log('location ', location);

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
        api.put(`/order/status/${orderId}`, { status: "Succeeded" })
          .then((res) => {
            setOrder(res.data?.response);
            setLoading(false);  
          })
          .catch((err) => {
            console.log(err);
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
            setLoading(false);
          });
    }, [location])
    

  return (
    <Box className='container' sx={{ margin: '0 auto' }}>
      <ToastContainer />
      {loading ? (
        <LinearProgress />
      ) : (
        <Box>
          <OrderTableDemo data={order} />
        </Box>
      )}
    </Box>
  )
}

export default PaymentSuccess
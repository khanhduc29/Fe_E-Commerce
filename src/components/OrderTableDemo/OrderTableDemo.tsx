import {
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  Paper,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { OrderItemType } from '../../features/home/types/order.types';

function TableHeader() {
  return (
    <Toolbar className="!flex-1 !justify-center">
      <Typography className="!font-semibold" component="h5" variant="h5">
        Mô tả đơn hàng
      </Typography>
    </Toolbar>
  );
}

interface OrderTableDemoProps {
  data: OrderItemType | null;
}

export default function OrderTableDemo({ data }: OrderTableDemoProps) {
  return (
    <Box component={'div'}>
      <CssBaseline />
      <Box sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Typography className="!text-center">
          Đơn hàng <b>{data?.id ? `#${data.id}` : 'không tìm thấy'}</b>
          {data?.status
            ? data.status == 'Succeeded'
              ? ` đã thanh toán thành công`
              : ` chưa được thanh toán`
            : ''}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          marginBottom: '40px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper>
          <TableHeader />
          <TableContainer>
            <Table size="small" className="md:min-w-[700px]">
              <TableBody>
                {data ? (
                  <>
                    <TableRow key={'id'}>
                      <TableCell align="left">
                        <Typography>Mã đơn hàng</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <b>#{data['id']}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow key={'status'}>
                      <TableCell align="left">Trạng thái</TableCell>
                      <TableCell align="left" style={{ color: data['status'] === 'Succeeded' ? 'green' : 'red' }}>
                        {data['status'] == 'Succeeded'
                          ? 'Đã thanh toán'
                          : 'Chưa thanh toán'}
                      </TableCell>
                    </TableRow>
                    {data?.products?.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">Sản phẩm</TableCell>
                        <TableCell align="left" style={{ maxWidth: 100 }}>
                          <img style={{  objectFit: 'cover' }} src={product?.product?.thumb} width={'100%'} alt='product image' />
                        </TableCell>
                        <TableCell align="left">
                          <ul style={{ listStyle: 'none', paddingInlineStart: 0 }}>
                            <li>{`Tên sản phẩm: ${product?.product?.title}`}</li>
                            <li>{`Số lượng: ${product?.count}`}</li>
                            <li>Đơn giá: <b>{`${product?.product?.price} VNĐ`}</b></li>
                          </ul>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow key={'amount'}>
                      <TableCell align="left">Tổng tiền</TableCell>
                      <TableCell align="right"><b>{data?.total} VNĐ</b></TableCell>
                    </TableRow>
                  </>
                ) : (
                  <TableRow
                    key={0}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" colSpan={12}>
                      Không có thông tin đơn hàng
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  
  import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
  import MoneyIcon from "@mui/icons-material/Money";

  type Props = {
    selectedIndex: number;
    handleListItemClick: (event: any, index: number) => void;
  }

  const PaymentMethod = ({ selectedIndex, handleListItemClick } : Props) => {
    return (
      <Box component={"div"} className="w-full p-5 flex flex-col">
        <Typography className="!font-bold !text-xl">
          Phương thức thanh toán
        </Typography>
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton
            selected={selectedIndex === 0}
            sx={{
                borderRight: selectedIndex === 0 ? "5px solid gray" : '',

            }}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Thanh toán bằng tài khoản ngân hàng" />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 1}
            sx={{
                borderRight: selectedIndex === 1 ? "5px solid gray" : '',
            }}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <MoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Thanh toán khi nhận hàng" />
          </ListItemButton>
        </List>
      </Box>
    );
  };
  
  export default PaymentMethod;
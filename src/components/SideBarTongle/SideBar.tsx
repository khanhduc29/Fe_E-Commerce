import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ArrowRightStartOnRectangleIcon, ClipboardDocumentCheckIcon, HomeIcon, PhoneIcon, RectangleGroupIcon, ShoppingBagIcon, UserCircleIcon, XMarkIcon, } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { Divider, IconButton } from '@mui/material';

import logo from "../../assets/images/logo_transprent.png"

interface SideBarProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

type SideBarItemType = {
  text: string;
  icon: React.ReactElement;
  path: string
}

const SideBarItem: SideBarItemType[] = [
  { text: 'HOME', icon: <HomeIcon width={24} height={24} color='#000' />, path: '' },
  { text: 'SHOP', icon: <ShoppingBagIcon width={24} height={24} color='#000' />, path: '/shop' },
  { text: 'PRODUCT', icon: <RectangleGroupIcon width={24} height={24} color='#000' />, path: '/product' },
  { text: 'BLOG', icon: <ClipboardDocumentCheckIcon width={24} height={24} color='#000' />, path: '/blog' },
  { text: 'CONTACT', icon: <PhoneIcon width={24} height={24} color='#000' />, path: '/contact' },
]

const SideBar: React.FC<SideBarProps> = ({ open, toggleDrawer }) => {
  const DrawerList = (
    <Box
      sx={{ width: 300, height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >

      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={logo} alt='GRADUATION PROJECT' height={100} style={{ padding: "16px" }} />
        </Box>
        <IconButton onClick={toggleDrawer(false)}>
          <XMarkIcon />
        </IconButton>
        <List>
          {SideBarItem.map((item, index) => (
            <ListItem key={index} disablePadding>
              <NavLink to={item.path} style={{ textDecoration: "none", color: "#000", width: '100%' }}>
                <ListItemButton>
                  <ListItemIcon sx={{ height: "30px" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ '& > span': { fontWeight: 500 } }} primary={item.text} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Box>


      <Box>
        <Divider />
        <List>
          <ListItem disablePadding>
            <NavLink to='/account' style={{ textDecoration: "none", color: "#000" }}>
              <ListItemButton>
                <ListItemIcon >
                  <UserCircleIcon width={24} height={24} color='#000' />
                </ListItemIcon>
                <ListItemText sx={{ '& > span': { fontWeight: 500 } }}  primary="ACCOUNT" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink to='/' style={{ textDecoration: "none", color: "#000" }}>
              <ListItemButton>
                <ListItemIcon>
                  <ArrowRightStartOnRectangleIcon width={24} height={24} color='#000' />
                </ListItemIcon>
                <ListItemText sx={{ '& > span': { fontWeight: 500 } }}  primary="LOGOUT" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)} disableEnforceFocus={true} style={{ margin: 12 }} >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBar;

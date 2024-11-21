import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Badge, Grid2 } from '@mui/material';
import {
  HeartIcon,
  HomeIcon,
  ShoppingBagIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '../../store/store';

const AppBottomNav = () => {
  const cartBadge = useAppSelector(
    (state: RootState) => state.auth.cartItemLength
  );
  const wishlistBadge = useAppSelector(
    (state: RootState) => state.auth.wishlistItemLength
  );
  

  const bottomNavStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: '#fff',
  };

  const buttonNavStyle = {
    color: '#000000',
    width: '25%',
    maxWidth: 'none',
    padding: '5px 15px',
    margin: 0,
    '& span': {
      fontSize: '9px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      textAlign: 'center',
      fontWeight: 500,
      marginTop: '5px',
    },
  };

  const navigate = useNavigate()
  const handleClick = (path: string) => {
    navigate(path, {replace: true});
  };

  return (
    <Grid2 container sx={bottomNavStyle}>
      <BottomNavigation sx={{ width: '100%', height: 'auto' }} showLabels>
        <BottomNavigationAction
          sx={buttonNavStyle}
          label="Home"
          onClick={() => {
            handleClick('/');
          }}
          icon={<HomeIcon width={'24px'} height={'24px'} />}
        />
        {/* <BottomNavigationAction
          sx={buttonNavStyle}
          label="Shop"
          onClick={() => {
            handleClick('/shop');
          }}
          icon={<Squares2X2Icon width={'24px'} height={'24px'} />}
        /> */}
        <BottomNavigationAction
          sx={buttonNavStyle}
          label="Account"
          onClick={() => {
            handleClick('/account');
          }}
          icon={<UserIcon width={'24px'} height={'24px'} />}
        />
        <BottomNavigationAction
          sx={buttonNavStyle}
          label="Wishlist"
          onClick={() => {
            handleClick('/wishlist');
          }}
          icon={
            <Badge badgeContent={wishlistBadge || 0} color="error">
              <HeartIcon width={'24px'} height={'24px'} />
            </Badge>
          }
        />
        <BottomNavigationAction
          sx={buttonNavStyle}
          label="Cart"
          onClick={() => {
            handleClick('/cart');
          }}
          icon={
            <Badge badgeContent={cartBadge || 0} color="error">
              <ShoppingBagIcon width={'24px'} height={'24px'} />
            </Badge>
          }
        />
      </BottomNavigation>
    </Grid2>
  );
};

export default AppBottomNav;

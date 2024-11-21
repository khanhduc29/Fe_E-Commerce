import { Outlet } from 'react-router-dom';
import AppFooter from '../../../components/AppFooter/AppFooter.';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { useMediaQuery } from '@mui/material';
import AppBottomNav from '../../../components/AppBottomNav/AppBottomNav';

const AppLayout = () => {
  const isBelow900Screen = useMediaQuery('(max-width:900px)');

  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
      {isBelow900Screen ? <AppBottomNav /> : null}
    </>
  );
};

export default AppLayout;

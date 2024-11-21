import { FC, memo } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HOME_ROUTES } from '../features/home/routes/home.routes';
import AUTH_ROUTES from '../features/auth/routes/auth.routes';
import AppLayout from '../features/home/layout/AppLayout';
import { AUTH_ROUTE } from './routes.config';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const AppRoutes = () => {
  const ProtectedRoute = ({
    element: Component,
    isAuthRoute,
  }: {
    element: FC;
    isAuthRoute: boolean;
  }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const location = useLocation();

    if (!isAuthenticated && isAuthRoute) {

      return <Navigate to={AUTH_ROUTE} state={{ from: location }} replace />;
    }

    return <Component />;
  };

  return (
    <Box>
      <Routes>
        <Route path="" element={<AppLayout />}>
          {HOME_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute
                  element={route.element}
                  isAuthRoute={route.isAuthRoute ?? false}
                />
              }
            />
          ))}

          {AUTH_ROUTES.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            );
          })}
        </Route>
      </Routes>
    </Box>
  );
};

export default memo(AppRoutes);

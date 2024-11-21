import { useFormik } from 'formik';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  SnackbarCloseReason,
  TextField,
  Typography,
} from '@mui/material';
import { initFormValue, schema } from '../../helpers/sign-in.helpers';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/store';
import { postLogin } from '../../redux/auth.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useCallback, useState } from 'react';
import SnackbarAlert from '../../../../components/ToastMessage/SnackbarAlert';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

const customBoxForm = {
  // background: "#fff",
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '50px',
  height: 'auto',
  padding: '50px',
  marginBottom: '20px',
};

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Snackbar
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
    message: '',
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    event?.preventDefault();
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar({
      ...openSnackbar,
      open: false,
    });
  };
  //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = useCallback(async (values: typeof initFormValue) => {
    try {
      const resultLogin = await dispatch(postLogin(values));
      unwrapResult(resultLogin);
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setOpenSnackbar({
          open: true,
          severity: 'error',
          message: error.response.data.mes,
        });
      } else {
        setOpenSnackbar({
          open: true,
          severity: 'error',
          message: 'Login failed',
        });
      }
    }
  }, [])

  const formik = useFormik({
    initialValues: initFormValue,
    validationSchema: schema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <>
      <SnackbarAlert
        open={openSnackbar.open}
        onClose={handleClose}
        message={openSnackbar.message}
        severity={openSnackbar.severity}
      />
      <Box
        sx={{
          ...customBoxForm,
          flexDirection: 'column',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '600',
              textAlign: 'left',
              marginBottom: '20px',
            }}
          >
            {t('sign_in')}
          </Typography>

          <Divider
            sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
          />

          <form
            onSubmit={formik.handleSubmit}
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <TextField
              fullWidth
              id="email"
              name="email"
              label={t('email_address')}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
              }}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
                '& .MuiOutlinedInput-root::placeholder': {
                  fontSize: '18px',
                  opacity: 0.7,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginBottom: '10px', borderRadius: '20px' }}
            >
              {t('sign_in')}
            </Button>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
              }}
            >
              <Link
                to={'#'}
                style={{ fontSize: '12px', textDecoration: 'none' }}
              >
                {t('forgot_password')}
              </Link>
              <Link
                to="/register"
                style={{ fontSize: '12px', textDecoration: 'none' }}
              >
                {t('dont_have_account')}
              </Link>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default LoginScreen;

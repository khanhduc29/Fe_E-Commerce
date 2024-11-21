import { useState } from 'react';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  SnackbarCloseReason,
} from '@mui/material';
import { initFormValue, schema } from '../../helpers/register.helpers';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authApi } from '../../apis/auth.api';
import SnackbarAlert from '../../../../components/ToastMessage/SnackbarAlert';
import { AxiosError } from 'axios';

const customBoxForm = {
  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '50px',
  height: 'auto',
  padding: '30px',
  marginBottom: '20px',
};
const RegisterScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const formik = useFormik({
    initialValues: initFormValue,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const response = await authApi.register(values);
        setOpenSnackbar({
          open: true,
          severity: 'success',
          message: response.data.message,
        });
        setTimeout(() => {
          navigate('/sign-in');
        }, 1000);
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
            message: t('register_screen.login_failed'),
          });
        }
      }
    },
  });
  return (
    <Box
      sx={{
        ...customBoxForm,
        flexDirection: 'column',
      }}
    >
      <SnackbarAlert
        open={openSnackbar.open}
        onClose={handleClose}
        message={openSnackbar.message}
        severity={openSnackbar.severity}
      />
      <Box>
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'left',
            marginBottom: '20px',
          }}
        >
          {t('register_screen.sign_up')}
        </Typography>

        <Divider
          sx={{ marginBottom: '20px', width: '100%', maxWidth: '400px' }}
        />

        <form
          onSubmit={formik.handleSubmit}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <Box sx={{ display: 'flex', gap: '5px' }}>
            <TextField
              id="firstname"
              name="firstname"
              label={t('register_screen.first_name')}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.firstname && Boolean(formik.errors.firstname)
              }
              helperText={formik.touched.firstname && formik.errors.firstname}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
              }}
            />
            <TextField
              id="lastname"
              name="lastname"
              label={t('register_screen.last_name')}
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}
              sx={{
                marginBottom: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '50px',
                },
              }}
            />
          </Box>
          <TextField
            fullWidth
            id="mobile"
            name="mobile"
            label={t('register_screen.mobile')}
            type="text"
            value={formik.values.mobile}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
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
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label={t('register_screen.email')}
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
            label={t('register_screen.password')}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type={showPassword ? 'text' : 'password'}
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
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ marginBottom: '10px', borderRadius: '20px' }}
          >
            {t('register_screen.sign_up')}
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
            ></Link>
            <Link
              to="/sign-in"
              style={{ fontSize: '12px', textDecoration: 'none' }}
            >
              {t('register_screen.have_account')}
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterScreen;

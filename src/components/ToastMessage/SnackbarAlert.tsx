import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import { Slide } from '@mui/material';

interface SnackbarAlertProps {
  open: boolean;
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => void;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

const SlideTransition = (props: any) => {
  return <Slide {...props} direction="down" />;
};

const SnackbarAlert: React.FC<SnackbarAlertProps> = ({
  open,
  onClose,
  message,
  severity,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={SlideTransition}
      sx={{ zIndex: 9999, marginTop: '20px' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;

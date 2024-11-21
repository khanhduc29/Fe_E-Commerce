import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CartTitle = () => {
  const { t } = useTranslation();
  return (
    <Typography
      sx={{
        fontSize: '30px',
        fontWeight: '500',
        lineHeight: '36px',
        textAlign: 'center',
        padding: '50px 0',
      }}
    >
      {t('your_shopping_cart')}
    </Typography>
  );
};

export default CartTitle;

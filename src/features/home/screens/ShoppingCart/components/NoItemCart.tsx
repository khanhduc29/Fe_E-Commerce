import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NoItemCart = () => {
  const { t } = useTranslation();

  return (
    <Stack justifyContent={'center'} alignItems={'center'} spacing={3} height={"80vh"} width={'100%'}>
      <Typography
        sx={{
          fontWeight: '600',
          fontSize: '13px',
          lineHeight: '20px',
          textTransform: 'uppercase',
        }}
        variant="h4"
      >
        {t('cart_empty')}
      </Typography>
      <Typography sx={{ fontSize: '13px', lineHeight: '20px', textAlign:"center" }}>
        {t('add_products_to_cart')}
        <br /> {t('find_interesting_products')}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: '11px', lineHeight: '20px', borderRadius: '0' }}
      >
        <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>
          {t('go_to_shopping')}
        </Link>
      </Button>
    </Stack>
  );
};

export default NoItemCart;

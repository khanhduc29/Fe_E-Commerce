import { Stack, Typography } from "@mui/material"
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useTranslation } from 'react-i18next';

const ShipNav = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="row" spacing={2} flex={'auto'} justifyContent={"flex-end"}>
      <LocalShippingOutlinedIcon />
      <Typography variant="subtitle2" sx={{ fontWeight: 400, fontSize: '12px', color: '#000000' }}>
        {t('free_shipping_on_orders_1000000_vnd')}
      </Typography>
    </Stack>
  )
}

export default ShipNav
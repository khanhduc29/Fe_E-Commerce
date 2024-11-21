import { Box, Divider, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next';

const ShippingTerms = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{marginTop:"90px"}}>
      <Typography variant="h3" sx={{
        fontSize: '22px',
        lineHeight: '26px',
        color: '#333',
      }}>{t('shipping')}</Typography>

      <Divider sx={{ margin: '10px 0', backgroundColor: "#636363", height: "1.5px", width: "30px" }} />
      <Typography variant="body1" sx={{ marginTop: "30px", fontSize: "13px", lineHeight: "26px" }}>
        {t('shipping_info_1')}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "30px", fontSize: "13px", lineHeight: "26px" }}>
        {t('shipping_info_2')}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: "30px", fontSize: "13px", lineHeight: "26px" }}>
        {t('shipping_info_3')}
      </Typography>
    </Box>
  )
}

export default ShippingTerms
import { Box, Divider, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next';

const ReturnTerm = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{marginTop:"90px"}}>
      <Typography variant="h3" sx={{
        fontSize: '22px',
        lineHeight: '26px',
        color: '#333',
      }}>{t('return')}</Typography>

      <Divider sx={{ margin: '10px 0', backgroundColor: "#636363", height: "1.5px", width: "30px" }} />
      <Typography variant="body1" sx={{ marginTop: "30px", fontSize: "13px", lineHeight: "26px" }}>
        {t('return_info_1')}
      </Typography>
      <ul style={{ fontSize: "13px", lineHeight: "26px" }}>
        <li>{t('return_info_2')}</li>
        <li>{t('return_info_3')}</li>
        <li>{t('return_info_4')}</li>
        <li>{t('return_info_5')}</li>
      </ul>
    </Box>
  )
}

export default ReturnTerm
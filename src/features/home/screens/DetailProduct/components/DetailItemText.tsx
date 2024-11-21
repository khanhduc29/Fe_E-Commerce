import { Box, Divider, Typography } from "@mui/material"
import { ProductItemType } from "../../../types/product.types"
import { useTranslation } from 'react-i18next';

interface DetailItemTextProps {
  product: ProductItemType | null
}

const DetailItemText = ({ product } : DetailItemTextProps ) => {
  const { t } = useTranslation();
  return (
    <Box sx={{marginTop:"90px"}}>
      <Typography variant="h3" sx={{
        fontSize: '22px',
        lineHeight: '26px',
        color: '#333',
      }}>{t('description')}</Typography>

      <Divider sx={{ margin: '10px 0', backgroundColor:"#636363", height:"1.5px", width:"30px" }} />
      <Typography variant="body1" sx={{marginTop:"30px", fontSize:"13px", lineHeight:"26px"}}>
        {product?.description?.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
       </Typography>
    </Box>
  )
}

export default DetailItemText
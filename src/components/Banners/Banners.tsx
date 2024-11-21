import { Box, Grid2, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CategorySide from './CategorySide/CategorySide';
import BannerContent from './BannerContent/BannerContent';
import bannerside1 from '../../assets/images/banner-side-1.webp';

const Banners = () => {
  const isAbove900 = useMediaQuery('(min-width:900px)');
  const { t } = useTranslation();

  return (
    <Box>
      <Grid2 container margin={'0 auto'} spacing={2}>
        {isAbove900 && (
          <Grid2 size={{ md: 2, xs: 0 }}>
            <CategorySide
              specialTitle={t('limited_time_only')}
              title={t('galaxy_for_everyone')}
              subt={t('pre_order_galaxy')}
              banner1={bannerside1}
            />
          </Grid2>
        )}
        <Grid2 size={{ md: 10, xs: 12 }}>
          <BannerContent />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Banners;

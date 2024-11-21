import { Grid2 } from '@mui/material';
import Banners from '../../../../components/Banners/Banners';
import InformationBar from '../../../../components/InformationBar/InformationBar';
import BannerCate from '../../../../components/Banners/BannerCate/BannerCate';
import ProductsHighlight from '../../../../components/ProductsHighlight/ProductsHighlight';
import ProductsFilterByCategory from '../../../../components/ProductsFilterByCategory/ProductsFilterByCategory';
import bannerside1 from '../../../../assets/images/banner-side-1.webp';
import bannerside2 from '../../../../assets/images/banner-side-2.webp';
import { useTranslation } from "react-i18next";
import { Row } from 'antd';
const HomePage = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <BannerCate />
      <Row
        className="background-not-white"
      >
        <Grid2
          container
          className="container"
          sx={{ margin: '20px auto 28px' }}
          spacing={2}
        >
          <Grid2 size={12}>
            <Banners />
          </Grid2>
          <Grid2 size={12}>
            <InformationBar />
          </Grid2>
          <Grid2 size={12}>
            <ProductsHighlight />
          </Grid2>
          <Grid2 size={12}>
            <ProductsFilterByCategory
              category="Laptop"
              specialTitle={<>{t('limited_time_only')}</>}
              title={
                <>
                  {t('galaxy_for_everyone')}
                </>
              }
              subt={t('pre_order_galaxy')}
              banner1={bannerside1}
            />
          </Grid2>
          <Grid2 size={12}>
            <ProductsFilterByCategory
              category="Tablet"
              specialTitle={<>{t('start_from_399')}</>}
              title={
                <>
                  {t('vive_vr_box')}
                </>
              }
              subt={t('fusce_neque')}
              banner1={bannerside2}
            />
          </Grid2>
        </Grid2>

      </Row>
    </>
  );
};

export default HomePage;

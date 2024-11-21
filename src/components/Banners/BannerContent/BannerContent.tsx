import { Button, useMediaQuery, Grid2 } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slider1 from '../../../assets/images/slider3-1.webp';
import slider2 from '../../../assets/images/slider3-2.jpg';
import slider3 from '../../../assets/images/slider3-3.jpg';
import banner1 from '../../../assets/images/banner-7.avif';
import banner2 from '../../../assets/images/banner-8.avif';
import BannerSlideItem from './BannerSlideItem/BannerSlideItem';
import BannerSubItem from './BannerSubItem/BannerSubItem';
import { useTranslation } from 'react-i18next';

const BannerContent = () => {
  const isAbove900 = useMediaQuery('(min-width:900px)');
  const { t } = useTranslation();

  const slideIn = keyframes`
    0% {
      transform: translateX(-100%);
      opacity: 0;
    }
    100% {
      transform: ${isAbove900 ? ' translateX(-10%)' : 'translateX(0%)'};
      opacity: 1;
    }
  `;

  const CustomButton = styled(Button)(() =>
    // { theme }
    ({
      backgroundColor: isAbove900 ? '#fff' : '#000000',
      color: isAbove900 ? '#000' : '#fff',
      textTransform: 'capitalize',
      fontWeight: '500',
      borderRadius: '20px',
      padding: '5px 14px',
      transition: 'all 0.3s',
      '&:hover': {
        backgroundColor: '#D84A5B',
        color: '#fff',
      },
      '& > span:first-of-type': {
        margin: 0,
      },
      '& > span > svg': {
        position: 'relative',
        padding: '5px',
        margin: '0px 0px 0px 10px',
        background: '#fff',
        color: '#000000',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        lineHeight: '20px',
        textAlign: 'center',
        display: 'inline-block',
      },
    })
  );

  return (
    <Grid2
      container
      direction="row"
      flexWrap="wrap"
      width={'100%'}
      height="100%"
      spacing={2}
    >
      <Grid2 size={{ md: 9, xs: 12 }}>
        <Swiper
          style={
            {
              marginBottom: isAbove900 ? '0' : '10px',
              paddingBottom: isAbove900 ? '0' : '30px',
              // borderRadius: '10px',
              width: '100%',
              height: isAbove900 ? '100%' : '',
              '--swiper-pagination-color': isAbove900 ? '#f03333' : '#000000',
              '--swiper-pagination-bullet-inactive-color': isAbove900
                ? '#fff'
                : '#636363',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-width': '5px',
              '--swiper-pagination-bullet-height': '5px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
              '--swiper-pagination-bottom': isAbove900 ? '5%' : '',
            } as React.CSSProperties
          }
          spaceBetween={50}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <BannerSlideItem
              subt1={t('start_from_399')}
              title={t('macbook_pro_m1')}
              subt2={t('lorem_ipsum')}
              slide={slider1}
              animate={slideIn}
              CustomButton={CustomButton}
            />
          </SwiperSlide>

          <SwiperSlide>
            <BannerSlideItem
              subt1={t('start_from_399')}
              title={t('vsmart_watch_se')}
              subt2={t('lorem_ipsum')}
              slide={slider2}
              animate={slideIn}
              CustomButton={CustomButton}
            />
          </SwiperSlide>

          <SwiperSlide>
            <BannerSlideItem
              subt1={t('start_from_399')}
              title={t('ultimate_ipad')}
              subt2={t('lorem_ipsum')}
              slide={slider3}
              animate={slideIn}
              CustomButton={CustomButton}
            />
          </SwiperSlide>
        </Swiper>
      </Grid2>
      <Grid2 size={{ md: 3, xs: 12 }}>
        <Grid2 container width={'100%'} height={'100%'} spacing={2}>
          <Grid2 size={12}>
            <BannerSubItem
              title={t('camera_videos')}
              subt={t('blocking_design')}
              banner1={banner1}
              CustomButton={CustomButton}
            />
          </Grid2>
          <Grid2 size={12}>
            <BannerSubItem
              title={t('mobile_tablet')}
              subt={t('promo_code')}
              banner1={banner2}
              CustomButton={CustomButton}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default BannerContent;

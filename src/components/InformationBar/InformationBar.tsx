import { Box, Grid2, useMediaQuery } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import InformationBarItem from './InformationBarItem/InformationBarItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

export type InformationBarItemType = {
  title?: string;
  content?: string;
  icon?: React.ReactNode;
};


const InformationBar = () => {
  const { t } = useTranslation();
  const isAbove900 = useMediaQuery('(min-width:900px)');
  
  const listInformationBarItem: InformationBarItemType[] = [
    {
      title: t('free_delivery'),
      content: t('when_ordering_from_500'),
      icon: (
        <LocalShippingOutlinedIcon sx={{ fontSize: '45px', color: '#D84A5B' }} />
      ),
    },
    {
      title: t('days_return'),
      content: t('if_goods_have_problems'),
      icon: <AllInboxIcon sx={{ fontSize: '45px', color: '#D84A5B' }} />,
    },
    {
      title: t('secure_payment'),
      content: t('percent_secure_payment'),
      icon: <CreditScoreIcon sx={{ fontSize: '45px', color: '#D84A5B' }} />,
    },
    {
      title: t('support'),
      content: t('dedicated_support'),
      icon: <HeadsetMicIcon sx={{ fontSize: '45px', color: '#D84A5B' }} />,
    },
  ];
  return (
    <Grid2
      container
      direction="row"
      justifyContent="space-around"
      className="container"
      sx={{
        backgroundColor: '#fff',
        borderRadius: '5px',
        // boxShadow:
        //   '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      }}
    >
      {isAbove900 &&
        listInformationBarItem.map((item, index) => (
          <Grid2 key={index}>
            <InformationBarItem
              title={item.title}
              icon={item.icon}
              content={item.content}
            />
          </Grid2>
        ))}

      {!isAbove900 && (
        <Swiper
          style={
            {
              marginBottom: '10px',
              paddingBottom: '30px',
              width: '100%',
              '--swiper-pagination-color': '#f03333',
              '--swiper-pagination-bullet-inactive-color': '#636363',
              '--swiper-pagination-bullet-inactive-opacity': '1',
              '--swiper-pagination-bullet-width': '5px',
              '--swiper-pagination-bullet-height': '5px',
              '--swiper-pagination-bullet-horizontal-gap': '6px',
            } as React.CSSProperties
          }
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {listInformationBarItem.map((item, index) => (
            <SwiperSlide key={index}>
              <Box>
                <InformationBarItem
                  title={item.title}
                  icon={item.icon}
                  content={item.content}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Grid2>
  );
};

export default InformationBar;

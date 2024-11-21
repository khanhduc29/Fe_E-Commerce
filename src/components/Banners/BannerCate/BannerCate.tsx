import { Box, Grid2, keyframes, styled } from '@mui/material';
import bgPolicy from '../../../assets/images/bgpolicy.jpg';
import BannerItem from './BannerItem/BannerItem';
import LaptopIcon from '@mui/icons-material/Laptop';
import SpeakerOutlinedIcon from '@mui/icons-material/SpeakerOutlined';
import HeadsetOutlinedIcon from '@mui/icons-material/HeadsetOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';

import {
  CameraIcon,
  DeviceTabletIcon,
  TvIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const BannerCate = () => {

  const shakeAnimation = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  `;
  const iconWidthHeight = {
    height: '40px',
    width: '40px',
  };
  const animationItemIcon = {
    '&:hover': {
      animation: 'shake 0.5s linear 1 forwards',
    },
  };

  const AnimatedCameraIcon = styled(CameraIcon)`
    ${iconWidthHeight};
    &:hover {
      animation: ${shakeAnimation} 0.5s ease-in-out;
    }
  `;

  const AnimatedTvIcon = styled(TvIcon)`
    ${iconWidthHeight};
    &:hover {
      animation: ${shakeAnimation} 0.5s ease-in-out;
    }
  `;

  const AnimatedDeviceTabletIcon = styled(DeviceTabletIcon)`
    ${iconWidthHeight};
    &:hover {
      animation: ${shakeAnimation} 0.5s ease-in-out;
    }
  `;

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        // marginTop: "10px",
        backgroundImage: `url(${bgPolicy})`,
        backgroundRepeat: 'no-repeat',
        height: 'auto',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <Grid2
        columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 7 }}
        container
        className="container"
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          paddingTop: '20px',
          paddingBottom: '27px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Grid2 sx={{ overflow: 'hidden' }} size={1}>
          <BannerItem
            title={t('audio_video')}
            icon={
              <SpeakerOutlinedIcon
                sx={{ ...iconWidthHeight, ...animationItemIcon }}
              />
            }
          />
        </Grid2>
        <Grid2 sx={{ overflow: 'hidden' }} size={1}>
          <BannerItem
            title={t('computer_laptop')}
            icon={
              <LaptopIcon sx={{ ...iconWidthHeight, ...animationItemIcon }} />
            }
          />
        </Grid2>
        <Grid2 sx={{ overflow: 'hidden' }} size={{ sm: 1, xs: 0 }}>
          <BannerItem title={t('digital_camera')} icon={<AnimatedCameraIcon />} />
        </Grid2>
        <Grid2 sx={{ overflow: 'hidden' }} size={{ md: 1, xs: 0 }}>
          <BannerItem
            title={t('headphone')}
            icon={
              <HeadsetOutlinedIcon
                sx={{ ...iconWidthHeight, ...animationItemIcon }}
              />
            }
          />
        </Grid2>
        <Grid2 sx={{ overflow: 'hidden' }} size={{ lg: 1, xs: 0 }}>
          <BannerItem
            title={t('mobile_tablet')}
            icon={<AnimatedDeviceTabletIcon />}
          />
        </Grid2>
        <Grid2 sx={{ overflow: 'hidden' }} size={{ xl: 1, xs: 0 }}>
          <BannerItem
            title={t('game_video')}
            icon={
              <SportsEsportsOutlinedIcon
                sx={{ ...iconWidthHeight, ...animationItemIcon }}
              />
            }
          />
        </Grid2>
		<Grid2 sx={{ overflow: 'hidden' }} size={{ xl: 1, xs: 0 }}>
          <BannerItem
            title={t('television')}
            icon={
              <AnimatedTvIcon />
            }
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BannerCate;

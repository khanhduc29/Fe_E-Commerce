/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface BannerSlideItemProps {
  subt1: React.ReactNode;
  title: React.ReactNode;
  subt2: React.ReactNode;
  slide: any;
  animate: any;
  CustomButton: any;
}

const BannerSlideItem = ({
  subt1,
  title,
  subt2,
  slide,
  animate,
  CustomButton,
}: BannerSlideItemProps) => {
  const isAbove900 = useMediaQuery('(min-width:900px)');

  const textStyle = {
    opacity: 0,
    animationFillMode: 'both',
    color: isAbove900 ? 'white' : 'black',
    textAlign: isAbove900 ? '' : 'center',
    fontWeight: '500',
  };

  return (
    <Box width="100%" height={'100%'} sx={{  }}>
      <img
        src={slide}
        alt="banner1"
        style={{
          width: '100%',
		  height: '100%',
          objectFit: 'cover',
          position: 'relative',
          borderRadius: isAbove900 ? '' : '10px',
        }}
      />
      <Box
        sx={{
          position: isAbove900 ? 'absolute' : 'relative',
          top: isAbove900 ? '50%' : '0',
          left: isAbove900 ? '10%' : '0',
          transform: isAbove900 ? 'translate(-10%, -50%)' : 'none',
          padding: isAbove900 ? '10px' : '20px 0 40px',
          borderRadius: '5px',
          display: isAbove900 ? 'block' : 'flex',
          flexDirection: isAbove900 ? '' : 'column',
          justifyContent: isAbove900 ? '' : 'center',
          alignItems: isAbove900 ? '' : 'center',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            animation: `${animate} 2s ease-in-out`,
            ...textStyle,
            color: isAbove900 ? 'white' : '#636363',
            fontSize: isAbove900 ? '14px' : '13px',
          }}
        >
          {subt1}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            animation: `${animate} 1s ease-in-out`,
            ...textStyle,
            lineHeight: '1.5',
            mt: '5px',
            fontSize: { xs: '25px', md: '40px' },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            animation: `${animate} 1.5s ease-in-out`,
            ...textStyle,
            color: isAbove900 ? 'white' : '#636363',
            fontSize: isAbove900 ? '14px' : '13px',
            mt: '10px',
          }}
        >
          {subt2}
        </Typography>
        <CustomButton
          LinkComponent="button"
          variant="contained"
          endIcon={<ArrowForwardIosIcon sx={{ fontSize: '8px' }} />}
          sx={{
            animation: `${animate} 1.7s ease-in-out`,
            ...textStyle,
            color: isAbove900 ? 'black' : 'white',
            fontSize: '12px',
            mt: isAbove900 ? '40px' : '20px',
            fontWeight: 500,
          }}
        >
          Learn More
        </CustomButton>
      </Box>
    </Box>
  );
};

export default BannerSlideItem;

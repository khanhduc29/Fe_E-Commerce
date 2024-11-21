/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, useMediaQuery } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface BannerSubItemProps {
  title: React.ReactNode;
  subt: React.ReactNode;
  banner1: any;
  CustomButton: any;
  specialTitle?: React.ReactNode;
}

const BannerSubItem = ({
  title,
  subt,
  banner1,
  CustomButton,
  specialTitle,
}: BannerSubItemProps) => {
  const isAbove900 = useMediaQuery('(min-width:900px)');

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        // borderRadius: '10px',
        height: '100%',
        width: '100%',
      }}
    >
      <img
        src={banner1}
        alt="banner1"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: specialTitle ? '' : '15%',
          left: specialTitle ? '' : '10%',
          top: specialTitle ? '5%' : '',
          padding: specialTitle ? '20px' : '0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
        }}
      >
        {specialTitle && (
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontSize: isAbove900 ? '18px' : '16px',
              fontWeight: '500',
            }}
          >
            {specialTitle}
          </Typography>
        )}
        <Typography
          variant="h2"
          sx={{
            color: 'white',
            fontSize: specialTitle
              ? isAbove900
                ? '32px'
                : '20px'
              : isAbove900
                ? '18px'
                : '16px',
            fontWeight: '500',
            mt: specialTitle ? '20px' : '',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: 'white',
            fontSize: '13px',
            fontWeight: '500',
            mt: specialTitle ? '20px' : '',
            mb: specialTitle ? '40px' : '',
            textWrap: 'wrap',
          }}
        >
          {subt}
        </Typography>
        <CustomButton
          variant="contained"
          endIcon={<ArrowForwardIosIcon />}
          sx={{
            fontSize: '12px',
            marginTop: '10px',
            background: 'white',
            color: 'black',
            '& > span > svg': {
              color: 'white',
              background: '#f03333',
            },
            '&:hover > span > svg': {
              color: '#f03333',
              background: 'white',
            },
          }}
        >
          Shop now
        </CustomButton>
      </Box>
    </Box>
  );
};

export default BannerSubItem;

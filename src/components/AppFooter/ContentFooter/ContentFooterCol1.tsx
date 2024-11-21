import { Link } from 'react-router-dom';
import { Box, Grid2, Stack, Typography, useMediaQuery } from '@mui/material';
import logo from '../../../assets/images/logo_transprent.png';
import styled from 'styled-components';
import { DeviceTabletIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const CustomSvg = styled.svg`
  height: 35px;
  width: 35px;
  border: 1px solid #636363;
  border-radius: 50%;
  padding: 8px;

  &:hover {
    border: 1px solid #f03333;
    background-color: #f03333;
    fill: #fff;
    cursor: pointer;
  }
`;
const ContentFooterCol1 = () => {
  const { t, i18n } = useTranslation();
  const isAbove900 = useMediaQuery('(min-width:900px)');
  const fontFamily = i18n.language === 'vi' ? 'Roboto' : 'Poppins';

  return (
    <Grid2 container>
      <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={isAbove900 ? '' : 'center'}>
        <img
          src={logo}
          alt="logo"
          width="150px"
          style={{ objectFit: 'cover' }}
        />
      </Grid2>
      <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={isAbove900 ? '' : 'center'}>
        <Box sx={{ marginTop: '20px' }}>
          <Typography
            sx={{
              fontFamily: fontFamily,
              textAlign: isAbove900 ? 'left' : 'center',
              fontSize: '13px',
              color: '#636363',
            }}
          >
            {t('if_you_have_any_question')} <br />
            <Link
              to="mailto:support@example.com"
              style={{ textDecoration: 'none', color: '#f03333' }}
            >
              {t('support_email')}
            </Link>
          </Typography>
        </Box>
      </Grid2>
      <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={isAbove900 ? '' : 'center'}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            marginTop: '30px',
            textAlign: 'left',
            fontSize: '13px',
            lineHeight: '19px',
            color: '#636363',
            fontFamily: fontFamily,
          }}
        >
          <MapPinIcon width={'24px'} height={'24px'} />
          <Typography variant="subtitle2" sx={{ textWrap: 'pretty' }}>
            {t('address')}
          </Typography>
        </Stack>
      </Grid2>
      <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={isAbove900 ? '' : 'center'}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            marginTop: '10px',
            textAlign: 'left',
            fontSize: '13px',
            lineHeight: '19px',
            color: '#636363',
            fontFamily: fontFamily,
          }}
        >
          <DeviceTabletIcon width={'24px'} height={'24px'} />
          <Typography variant="subtitle2">{t('phone_number')}</Typography>
        </Stack>
      </Grid2>
      <Grid2 size={12} display={'flex'} alignItems={'center'} justifyContent={isAbove900 ? '' : 'center'}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{ marginTop: '30px', marginBottom: '30px' }}
        >
          <CustomSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
          </CustomSvg>
          <CustomSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
          </CustomSvg>
          <CustomSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M385.2 167.6c6.4 0 12.6 .3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2 .1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3 .1 10-9.9 19.6-24.4 19.6z" />
          </CustomSvg>
          <CustomSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
          </CustomSvg>
        </Stack>
      </Grid2>
    </Grid2>
  );
};

export default ContentFooterCol1;

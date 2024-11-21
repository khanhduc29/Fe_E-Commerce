import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import bgNewsletter from '../../../assets/images/bg-newletter.jpg';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const NewsLetter = () => {
  const { t } = useTranslation();
  const mobileScreen = useMediaQuery('(max-width:599px)');
  const tabletScreen = useMediaQuery(
    '(min-width:600px) and (max-width:1024px)'
  );

  return (
    <Stack
      direction={mobileScreen || tabletScreen ? 'column' : 'row'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{
        width: '100%',
        margin: '0 auto',
        borderRadius: mobileScreen ? '70px' : '100px',
        backgroundImage: `url(${bgNewsletter})`,
        backgroundRepeat: 'no-repeat',

        height: 'auto',

        backgroundPosition: '50% 50%',
        backgroundSize: 'cover',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          padding: mobileScreen || tabletScreen ? '10px 0 10px' : '20px 0 27px',
          marginLeft: mobileScreen || tabletScreen ? '0px' : '30px',
          width: mobileScreen || tabletScreen ? '80%' : '40%',
        }}
      >
        <EnvelopeOpenIcon
          style={{
            width: mobileScreen ? '24px' : '40px',
            height: mobileScreen ? '24px' : '40px',
            color: '#fff',
          }}
        />
        <Stack>
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontSize: mobileScreen ? '15px' : '22px',
              fontWeight: 500,
              lineHeight: '30px',
            }}
          >
            {t('sign_up_for_our_email_update')}
          </Typography>

          {!mobileScreen && (
            <Typography
              variant="h6"
              color="white"
              sx={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '20px',
              }}
            >
              {t('sign_up_for_emails_and_unlock_first_access')}
            </Typography>
          )}
        </Stack>
      </Box>

      <Box
        component="form"
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '50px',
          border: '2px solid',
          borderColor: '#e9e9e9',
          flexGrow: 1,
          padding: '5px',
          width: mobileScreen || tabletScreen ? '80%' : '40%',
          marginRight: mobileScreen || tabletScreen ? '0' : '30px',
          marginBottom: mobileScreen || tabletScreen ? '20px' : '0',
        }}
      >
        <TextField
          type="text"
          placeholder={t('email_address_placeholder')}
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              sx: {
                display: 'flex',
                alignItems: 'center',
                padding: '0 0 0 5px',
                fontSize: '1.2vh',
                fontWeight: 450,
                border: 0,
                width: '100%',
                '&::placeholder': {
                  color: '#000000',
                },
                '&::input': {
                  flexGrow: 1,
                },
              },
            },
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            border: 0,
            width: '100%',
            lineHeight: 1.2,
            backgroundColor: 'transparent',
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'black',
            borderRadius: '100px',
            paddingLeft: '30px',
            paddingRight: '30px',
            textTransform: 'none',
            borderStyle: 'solid',
            borderColor: '#000000',
            '&:hover': {
              backgroundColor: '#f03333',
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: '1.1vh', fontWeight: '500', lineHeight: 2 }}
          >
            {t('subscribe')}
          </Typography>
        </Button>
      </Box>
    </Stack>
  );
};

export default NewsLetter;

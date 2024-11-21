import { GiftIcon } from '@heroicons/react/24/outline';
import { Box, Stack, TextareaAutosize, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NoteForOrder = () => {
  const { t } = useTranslation();
  const typoCss = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '11px',
    lineHeight: '19.5px',
    textAlign: 'left',
  };

  return (
    <Stack sx={{ marginTop: '50px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <GiftIcon
          style={{ height: '24px', lineHeight: '24px', textAlign: 'left', marginRight: '5px' }}
        />
        <Typography variant="body2" sx={typoCss}>
          {t('add_gift_wrap')}
          <Typography
            component={'span'}
            variant="body2"
            sx={{ ...typoCss, color: '#f03333' }}
          >
            &nbsp; {t('only')} &nbsp;
          </Typography>
          <Typography
            component={'span'}
            variant="body2"
            sx={{
              ...typoCss,
              border: '1px solid #636363',
              padding: '5px 15px',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: '#f03333',
                color: '#fff',
                cursor: 'pointer',
                border: '1px solid #f03333',
                outline: 'none',
              },
            }}
          >
            {t('add_a_gift_wrap')}
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '13px', lineHeight: '19.5px', textAlign: 'left' }}
        >
          {t('special_instructions_for_seller')}
        </Typography>
        <TextareaAutosize
          minRows={3}
          maxRows={10}
          placeholder={t('how_can_i_help_you')}
          style={{
            marginTop: '10px',
            backgroundColor: 'transparent',
            lineHeight: '19.5px',
            width: '100%',
            maxWidth: '100%',
            padding: '10px 20px',
            fontSize: '13px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </Box>
    </Stack>
  );
};

export default NoteForOrder;

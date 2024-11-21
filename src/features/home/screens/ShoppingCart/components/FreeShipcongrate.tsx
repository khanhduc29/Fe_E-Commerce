import { BoltIcon } from '@heroicons/react/24/outline';
import { Box, LinearProgress, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useTranslation } from 'react-i18next';

const CustomLinearProgress = styled(LinearProgress)<{ isreached: boolean }>(({ isreached }) => ({
  height: 5,
  backgroundColor: '#f2f2f2',
  borderRadius: '10px',
  '& .MuiLinearProgress-bar': {
    backgroundColor: [true, 'true'].includes(isreached) ? '#4caf50' : '#000',
    backgroundImage: [true, 'true'].includes(isreached)
      ? 'repeating-linear-gradient(45deg, #4caf50, #4caf50 10px, #66bb6a 10px, #66bb6a 20px)'
      : 'repeating-linear-gradient(45deg, #000, #000 10px, #484848 10px, #484848 20px)',
    backgroundSize: '200% 100%',
    animation: 'stripe 20s linear infinite',
  },
  '@keyframes stripe': {
    '0%': {
      backgroundPosition: '100% 0',
    },
    '100%': {
      backgroundPosition: '0 0',
    },
  },
}));

const FreeShipcongrate = ({ subTotal }: { subTotal: number }) => {
  const freeShippingThreshold = 1000000;
  const progressValue = Math.min((subTotal / freeShippingThreshold) * 100, 100);
  const isreached : boolean = subTotal >= freeShippingThreshold ? true : false;
  

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  // Trạng thái để hiển thị pháo hoa
  const [showConfetti, setShowConfetti] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isreached) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isreached]);

  return (
    <Stack sx={{ backgroundColor: '#fff', width: '100%', padding: '50px ' }}>
      {showConfetti && <Confetti />}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <BoltIcon
          style={{ height: '24px', lineHeight: '24px', textAlign: 'left' }}
        />
        <Typography
          sx={{
            fontSize: '9px',
            fontWeight: '500',
            lineHeight: '14px',
            textAlign: 'left',
            textTransform: 'uppercase',
          }}
        >
          {t('free_shipping_on_orders', { amount: formatter.format(1000000) })}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '13px',
          lineHeight: '19px',
          textAlign: 'left',
          marginTop: '5px',
        }}
      >
        {isreached
          ? t('congratulations_free_shipping')
          : t('away_from_free_shipping', { amount: formatter.format(freeShippingThreshold - subTotal) })}
      </Typography>
      <Box sx={{ width: '100%', marginTop: '20px' }}>
        {!!isreached && <CustomLinearProgress variant="determinate" value={progressValue} isreached={isreached} />}
      </Box>
    </Stack>
  );
};

export default FreeShipcongrate;

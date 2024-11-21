/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack, styled, useMediaQuery } from '@mui/material';
import BannerSubItem from '../BannerContent/BannerSubItem/BannerSubItem';

interface CategorySideProps {
  specialTitle: React.ReactNode;
  title: React.ReactNode;
  subt: React.ReactNode;
  banner1: any;
}

export default function CategorySide({
  specialTitle,
  title,
  subt,
  banner1,
}: CategorySideProps) {
  const isAbove900 = useMediaQuery('(min-width:900px)');

  const CustomButton = styled(Button)(() =>
    // { theme }
    ({
      backgroundColor: isAbove900 ? '#fff' : '#000000',
      color: isAbove900 ? '#000' : '#fff',
      textTransform: 'capitalize',
      fontWeight: '500',
      borderRadius: '20px',
      padding: '5px 20px',
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
        margin: '0px 0px 0px 3px',
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
    <Stack
      width={'100%'}
      height={'100%'}
      direction="column"
      justifyContent={isAbove900 ? 'flex-start' : 'center'}
      spacing={1}
    >
      <BannerSubItem
        specialTitle={specialTitle}
        title={title}
        subt={subt}
        banner1={banner1}
        CustomButton={CustomButton}
      />
    </Stack>
  );
}

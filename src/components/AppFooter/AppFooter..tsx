import { Box, Divider } from '@mui/material';
import ContentFooter from './ContentFooter/ContentFooter';
import NewsLetter from './NewsLetter/NewsLetter';
import LastFooterContent from './ContentFooter/LastFooterContent';

const AppFooter = () => {
  return (
    <Box className="container" display={'flex'} flexDirection={'column'} sx={{ margin: '30px auto 0' }}>
      <NewsLetter />
      <ContentFooter />
      <Divider sx={{ margin: '50px 0 0 0' }} />
      <LastFooterContent />
    </Box>
  );
};

export default AppFooter;

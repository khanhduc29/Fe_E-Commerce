import { Box, Stack, Typography } from '@mui/material';

interface InformationBarItemProps {
  icon?: React.ReactNode;
  title?: string;
  content?: string;
}

const InformationBarItem = ({
  icon,
  title,
  content,
}: InformationBarItemProps) => {
  return (
    <Stack direction="row" justifyContent="center" spacing={2} padding="40px 0">
      <Box>{icon}</Box>
      <Stack>
        <Typography variant="h6" sx={{ fontWeight: '600', fontSize: '14px' }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: '400' }}>{content}</Typography>
      </Stack>
    </Stack>
  );
};

export default InformationBarItem;

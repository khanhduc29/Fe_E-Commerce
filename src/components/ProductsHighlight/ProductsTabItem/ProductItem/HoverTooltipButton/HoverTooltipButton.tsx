import { Grid2, IconButton } from '@mui/material';

interface HoverTooltipButtonProps {
    icon: React.ReactNode
    onClick: (e : React.MouseEvent<HTMLButtonElement>) => void
}

const HoverTooltipButton = ({ icon, onClick } : HoverTooltipButtonProps) => {
  return (
    <Grid2>
      <IconButton
        className="notBorderRadius hoverIconButtonEffect"
        onClick={onClick}
        sx={{
          color: '#000',
          textAlign: 'center',
          backgroundColor: '#fff',
          width: '40px',
          height: '40px',
          whiteSpace: 'nowrap',
          p: '0',
          position: 'relative',
          border: 'thin solid #e9e9e9',
          
        }}
      >
        {icon}
      </IconButton>
    </Grid2>
  );
};

export default HoverTooltipButton;

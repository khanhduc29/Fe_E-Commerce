// import { Grid, Grid2 } from "@mui/material";
import { ItemF, ItemFooter } from '../constants/constant';
import ContentFooterCol1 from './ContentFooterCol1';
import ContentFooterCol2_4 from './ContentFooterCol2_4';
import Grid2 from '@mui/material/Grid2';

const ContentFooter = () => {
  return (
    <Grid2
      container
      spacing={0}
      justifyContent={'center'}
      alignItems={'start'}
      sx={{
        margin: '50px auto 0',
        width: '100%',
      }}
    >
      <Grid2 size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
        <ContentFooterCol1 />
      </Grid2>

      {ItemFooter.map((item: ItemF, index) => {
        return (
          <Grid2 key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
            <ContentFooterCol2_4 item={item} />
          </Grid2>
        );
      })}
    </Grid2>
  );
};

export default ContentFooter;

/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 20/01/2022 - 03:27:25
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NftCard = (props) => {
  return (
    <Card sx={{  borderRadius: '12px', margin: 'auto' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        // height="70%"
        image={props.img}
      />
      <CardContent
        sx={{ 
            height: '120px'
        }}>
        <Typography variant="body2" color="text.secondary">
          Fluid is flu
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Art
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default NftCard
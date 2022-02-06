/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 20:33:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { Avatar, Card, CardContent, CardMedia, Typography, Box } from '@mui/material'

const CardWithImg = (props) => {
  return (
    <Card
      sx={{
        minHeight: '200px',
        borderRadius: 5,
        // mb: 5
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{height: '120px !important'}}
        image={ props.image }
      />
        
      <CardContent
        sx={{
          position: 'relative',
          height: 80
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={ props.avatar }
          sx={{
            position: 'absolute',
            boxSizing: 'border-box',
            top: -42,
            left: 32, 
            width: 84,
            height: 84,
            border: '2px solid #fff',
            borderRadius: 42
          }}
        />
          <Box
            pl={15}
          >
            <Typography
              fontSize={20}
              fontWeight='bold'
            >
              Sarah
            </Typography>
            <Typography>
              NFT Creator
            </Typography>

          </Box>
      </CardContent>
    </Card>
  );
}

export default CardWithImg;
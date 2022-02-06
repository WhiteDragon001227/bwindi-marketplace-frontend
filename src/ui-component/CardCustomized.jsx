/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 20:33:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { Grid, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import WalletAddress from './WalletAddress'

const CardCustomized = (props) => {
  return (
    <div className={`${props.className}`}>
      <div className="flex items-center justify-between">
        <div>
          {props.externalTitle && (
            <div className="ml-2">
              <Typography ml={2} sx={{
                fontSize: '1.4rem',
              }}>
                {props.externalTitle}
              </Typography>
            </div>
          )
          }
        </div>
        <div>
          {props.walletAddress && (
            <WalletAddress style={{ float: 'right' }} />
          )}
        </div>
      </div>
      <Card
        className="w-full"
        sx={{
          height: `${props.height}`,
          minHeight: '186px',
          borderRadius: '20px',
          backgroundImage: `url(${props.bgimg})`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%'
        }}
      >
        {
          props.title ?
            <CardHeader
              action={
                props.icon ?
                  <IconButton
                    sx={{
                      width: '32px',
                      height: '32px',
                      // m: '2px 7px',
                      boxShadow: 1
                    }}
                    aria-label="settings">
                    {props.icon}
                  </IconButton> : ''
              }
              title={
                <Typography>
                  {props.title}
                </Typography>
              }
            /> : ''
        }
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </div>
  )
}

export default CardCustomized;
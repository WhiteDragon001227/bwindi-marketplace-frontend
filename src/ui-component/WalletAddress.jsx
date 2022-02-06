/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 22/01/2022 - 03:05:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useContext } from 'react'
import { Grid, Paper, Box, Typography, IconButton, Stack } from '@mui/material';
import { ContentCopy } from '@mui/icons-material'
import web3 from '../connection/web3';
import Web3Context from '../store/web3-context';
import { getEllipsisTxt } from "../helpers/formatters";

const WalletAddress = (props) => {

  const web3Ctx = useContext(Web3Context)
  const account = web3Ctx.account

  if (!account) return (<>Connect wallet first</>)
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '176px',
        height: '24px',
        borderRadius: '20px',
        fontSize: '12px',
        px: 1
      }}
    >
      <Typography>
        {account && (
          <>
            {getEllipsisTxt(account, 6)}
          </>
        )}
      </Typography>
      <IconButton>
        <ContentCopy />
      </IconButton>

    </Paper>
  )
}

export default WalletAddress
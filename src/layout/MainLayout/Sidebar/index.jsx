/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 21:23:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { Home, ViewInAr, AccountBalanceWallet, AutoStories, ChatBubbleOutline, SettingsOutlined, FormatListBulleted, } from '@mui/icons-material'

const Sidebar = (props) => {
  return (
    <Paper
      component='div'
      className={`${props.className}`}
      sx={{
        float: 'left',
        mx: '32px',
        borderRadius: '20px',
        // width: '100',
      }}
    >
      <List
        sx={{
          padding: '20px',
        }}
      >
        <Link to='/admin'>
          <ListItemButton key='admin'>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>
              Home
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/nft'>
          <ListItemButton key='adminnft'>
            <ListItemIcon>
              <ViewInAr />
            </ListItemIcon>
            <ListItemText>
              My NFTs
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/earning'>
          <ListItemButton key='adminearning'>
            <ListItemIcon>
              <AccountBalanceWallet />
            </ListItemIcon>
            <ListItemText>
              My Earnings
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/order'>
          <ListItemButton key='adminorder'>
            <ListItemIcon>
              {/* <Search /> */}
            </ListItemIcon>
            <ListItemText>
              My Orders
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/review'>
          <ListItemButton key='adminreview'>
            <ListItemIcon>
              <ChatBubbleOutline />
            </ListItemIcon>
            <ListItemText>
              Review
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/nft'>
          <ListItemButton key='adminnft1'>
            <ListItemIcon>
              <FormatListBulleted />
            </ListItemIcon>
            <ListItemText>
              Listings
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/history'>
          <ListItemButton  key='adminhistory'>
            <ListItemIcon>
              <AutoStories />
            </ListItemIcon>
            <ListItemText>
              History
            </ListItemText>
          </ListItemButton>
        </Link>

        <Link to='/admin/settings'>
          <ListItemButton key='adminsettings'>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText>
              Settings
            </ListItemText>
          </ListItemButton>
        </Link>
      </List>
    </Paper>

    // </PerfectScrollbar>
  )
}

export default Sidebar;
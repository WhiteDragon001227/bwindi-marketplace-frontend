/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 18/01/2022 - 23:10:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { Box, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom'
import Logo from '../../../ui-component/Logo';
import SearchInput from './SearchInput';
import MenuList from './MenuList'

const Header = () => {
  return (
    <AppBar
      // position='fixed'
      color='inherit'
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Box component='div'>
          <Link to='/'>
            <Logo />
          </Link>
        </Box>
        <Box component='div'>
          <SearchInput />
        </Box>
        <Box component='div'>
          <MenuList />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header;
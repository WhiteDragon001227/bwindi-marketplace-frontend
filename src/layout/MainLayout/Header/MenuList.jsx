/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 18/01/2022 - 21:57:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useState, useContext, useEffect } from 'react';
import { Button, Box, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SigninWallet from '../../../ui-component/SigninWallet'
import Signin from '../../../ui-component/Signin'
import Signup from '../../../ui-component/Signup'
import ProfileMenu from '../../../ui-component/ProfileMenu'
import Web3Context from '../../../store/web3-context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

const menuList = [{
  name: 'Marketplace',
  url: '/marketplace'
},
{
  name: 'Browse',
  url: '/browse',
},
{
  name: 'Create',
  url: '/create'
}]

const MenuList = (props) => {
  const { auth: { isAuthenticated }, logout } = props
  const [signInOpen, setSignInOpen] = React.useState(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignInClose = () => setSignInOpen(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  const handleSignUpOpen = () => setSignUpOpen(true);
  const handleSignUpClose = () => setSignUpOpen(false);
  const web3Ctx = useContext(Web3Context);
  const balance = web3Ctx.balance
  const account = web3Ctx.account
  const chainId = web3Ctx.networkId

  return (
    <Box
      className="flex justify-center items-center"
      sx={{
        minWidth: 'fit-content',
        borderRadius: 1,
        bgColor: 'background.paper',
        color: 'text.secondary',
        '& svg': {
          m: 1.5,
        },
        '& hr': {
          mx: 0.5,
        },
      }}
    >
      {
        menuList.map((item, ndx) => {
          return (
            <Button
              key={ndx}
              sx={{
                color: '#4C565E',
                textTransform: 'unset',
                fontWeight: 'bold',
                mr: 3
              }}
            >
              <Link to={item.url}>{item.name}</Link>
            </Button>
          )
        })
      }
      {/* <Divider orientation="vertical" /> */}
      {
        (account || isAuthenticated) ? (
          <ProfileMenu />
        ) : (
          <>
            <div>
              <Button variant="unfilled-uncamel" onClick={handleSignInOpen}>Login</Button>
            </div>
            <div className="ml-2">
              <Button variant="filled-uncamel" className="w-auto min-w-full" onClick={handleSignUpOpen}>Sign Up</Button>
            </div>
            <Signin open={signInOpen} handleClose={handleSignInClose} handleOpen={handleSignInOpen} handleOtherOpen={handleSignUpOpen} />
            <Signup open={signUpOpen} handleClose={handleSignUpClose} handleOpen={handleSignUpOpen} handleOtherOpen={handleSignInOpen} />
          </>
        )
      }
    </Box>
  )
}

MenuList.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(MenuList);
/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 24/01/2022 - 01:57:01
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import Logo from '../../../assets/img/logo-white.svg'
import {
  Box, Grid, Container,
  List, ListItem, ListItemText, Stack,
  TextField, InputAdornment, Button, IconButton, Typography
} from '@mui/material';
import { Instagram, LinkedIn, Facebook, Twitter } from '@mui/icons-material'
import { Email } from '@mui/icons-material'
import React from 'react'

const marketplaceList = ['All NFTs', 'New', 'Art', 'Music', 'Domains', 'Collectibles', 'Videos'];
const accountList = ['Profile', 'Favorite', 'My Collections', 'Settings'];
const resourceList = ['Help Center', 'FAQ', 'Partners', 'Suggestions', 'Blog', 'Docs'];
const companyList = ['About', 'Privacy Policy', 'Terms of Use'];

const Footer = () => {
  return (
    <Box
      component='div'
      sx={{
        py: '85px',
        textAlign: 'center',
        backgroundColor: '#4D6194',
        color: '#F3FBFE'
      }}
    >
      <div className="flex justify-center items-center">
        {/* <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment>
              <Email sx={{ color: '#7B848D', mr: '10px' }} />
            </InputAdornment>
          )
        }}
        placeholder='Your email'
        size='small'
        sx={{ backgroundColor: '#fff', borderRadius: '10px', width: '320px' }}
      /> */}
        <input type="text" className='form-control' placeholder="email address..." style={{ width: '320px', height: '40px' }} />
        <Button
          variant='contained'
          sx={{
            height: '40px',
            borderRadius: '10px',
            color: '#fff',
            border: '0px',
            ml: '10px'
          }}
        >Subscribe</Button>
      </div>
      <Container
        sx={{
          mt: '50px',
          textAlign: 'left'
        }}
      >
        <Grid container spacing={10}>
          <Grid item md={8}>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <List>
                  <ListItem key={1212}>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 700, color: '#fff' }}>
                          Marketplace
                        </Typography>
                      }
                    />
                  </ListItem>
                  {
                    marketplaceList.map((item, ndx) => {
                      return (
                        <ListItem key={ndx}>
                          <ListItemText
                            primary={item}
                          />
                        </ListItem>
                      );
                    })
                  }
                </List>
              </Grid>
              <Grid item md={3}>
                <List>
                  <ListItem key={1212}>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 700, color: '#fff' }}>
                          My Account
                        </Typography>
                      }
                    />
                  </ListItem>
                  {
                    accountList.map((item, ndx) => {
                      return (
                        <ListItem key={ndx}>
                          <ListItemText
                            primary={item}
                          />
                        </ListItem>
                      );
                    })
                  }
                </List>
              </Grid>
              <Grid item md={3}>
                <List>
                  <ListItem key={1212}>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 700, color: '#fff' }}>
                          Resources
                        </Typography>
                      }
                    />
                  </ListItem>
                  {
                    resourceList.map((item, ndx) => {
                      return (
                        <ListItem key={ndx}>
                          <ListItemText
                            primary={item}
                          />
                        </ListItem>
                      );
                    })
                  }
                </List>
              </Grid>
              <Grid item md={3}>
                <List>
                  <ListItem key={1212}>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 700, color: '#fff' }}>
                          Company
                        </Typography>
                      }
                    />
                  </ListItem>
                  {
                    companyList.map((item, ndx) => {
                      return (
                        <ListItem key={ndx}>
                          <ListItemText
                            primary={item}
                          />
                        </ListItem>
                      );
                    })
                  }
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Typography
              align='left'
              sx={{ fontWeight: 700, p: '20px 0 10px', color: '#fff' }}
            >
              Join our company
            </Typography>
            <Stack direction='row'>
              <IconButton>
                <Instagram />
              </IconButton>
              <IconButton>
                <LinkedIn />
              </IconButton>
              <IconButton>
                <Facebook />
              </IconButton>
              <IconButton>
                <Twitter />
              </IconButton>
            </Stack>
            <img src={Logo} width={160} height={25} alt='logo' style={{ marginTop: '50px' }} />
            <Typography sx={{ color: '#fff', marginTop: '5px' }}>
              New digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital assets.
            </Typography>
          </Grid>
        </Grid>
      </Container>

    </Box>
  )
}

export default Footer;
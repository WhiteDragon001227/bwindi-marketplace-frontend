/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 23:25:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import Web3Provider from './store/Web3Provider';
import NFTCollectionProvider from './store/NFTCollectionProvider';
import NFTMarketplaceProvider from './store/NFTMarketplaceProvider';
import { LOGOUT } from './actions/types';
import Alert from './ui-component/Alert'
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const theme = createTheme({
  palette: {
    background: {
      default: '#E9ECF2',
      secondary: '#4C565E'
    },
    text: {
      primary: '#4C565E',
      secondary: '#4D6194'
    },
    color: {
      primary: '#4C565E',
    }
  },
  typography: {
    fontFamily: "'Poppins', 'sans-serif'",
    fontSize: '100px !important'
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: '4px !important',
          borderRadius: '12px !important'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          borderRadius: '20px !important'
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          '& .MuiPaper-root': {
            borderRadius: '20px',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // borderRadius: '8px !important',
          // border: '0.1px solid rgba(25, 25, 25, 0.25)'
        },
      },
      variants: [
        {
          props: { variant: 'hover' },
          style: {
            borderRadius: '8px !important',
            border: '0.1px solid rgba(25, 25, 25, 0.25)',
            '&:hover': {
              // boxShadow: '0px 15px 30px -12px rgb(0 0 0 / 0.5)',
              boxShadow: '0px 4px 7px -2px rgb(0 0 0 / 0.5)',
              // transition: 'all 0.1s ease 0s !important'
            }
          }
        }
      ]
    },
    MuiCardContent: {
      variants: [
        {
          props: { variant: 'nftcardcontainer' },
          style: {
            padding: '30px',
          },
        }
      ]
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'secondary' },
          style: {
            color: '#4D6194',
            fontSize: '18px',
          },
        }
      ]
    },
    MuiDivider: {
      variants: [
        {
          props: { variant: 'label' },
          style: {
            '&::before, &::after': {
              top: '0% !important'
            }
          },
        }
      ]
    },
    MuiButton: {
      styleOverrides: {
        root: {
        }
      },
      variants: [
        {
          props: { variant: 'filled-uncamel' },
          style: {
            backgroundColor: '#4D6194',
            borderRadius: '8px',
            textTransform: 'unset !important',
            color: 'white',
            '&:hover': {
              backgroundColor: '#4D6194',
              color: 'white',
              boxShadow: '0px 4px 7px -2px rgb(0 0 0 / 0.5)',

              // backgroundColor: 'white',
              // color: '#4D6194',
              // border: '1px solid #4D6194',
            }
          },
        },
        {
          props: { variant: 'unfilled-uncamel' },
          style: {
            color: '#4D6194',
            backgroundColor: 'white',
            border: '1px solid #4D6194',
            borderRadius: '8px',
            textTransform: 'unset !important',
            '&:hover': {
              backgroundColor: '#4D6194',
              color: 'white',
              boxShadow: '0px 4px 7px -2px rgb(0 0 0 / 0.5)',
              // boxShadow: '0px 15px 30px -12px rgb(0 0 0 / 0.5)',
            }
          },
        },
        {
          props: { variant: 'filled' },
          style: {
            backgroundColor: '#4D6194',
            borderRadius: '8px',
            color: 'white',
            '&:hover': {
              backgroundColor: '#4D6194',
              color: 'white',
              boxShadow: '0px 4px 7px -2px rgb(0 0 0 / 0.5)',
              // boxShadow: '0px 15px 30px -12px rgb(0 0 0 / 0.5)',
            }
          },
        },
        {
          props: { variant: 'filled-secondary' },
          style: {
            backgroundColor: '#F58C25',
            border: '1px solid #E5E5E5',
            borderRadius: '24px',
            color: 'white',
            textTransform: 'unset !important',
            fontSize: '16px',
            height: '56px',
            '&:hover': {
              backgroundColor: '#F58C25',
              color: 'white',
              boxShadow: '0px 4px 7px -2px rgb(0 0 0 / 0.5)',
              // boxShadow: '0px 15px 30px -12px rgb(0 0 0 / 0.5)',
            }
          },
        },
      ],
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '14px'
        }
      }
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NFTCollectionProvider>
          <NFTMarketplaceProvider>
            <Web3Provider>
              <CssBaseline />
              <Alert />
              <App />
            </Web3Provider>
          </NFTMarketplaceProvider>
        </NFTCollectionProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

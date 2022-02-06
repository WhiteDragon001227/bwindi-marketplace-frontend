/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 20:32:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainRoutes from './routes'
import MarketplaceRoutes from './routes/marketplace'
import CreateRoutes from './routes/create'
import MainLayout from './layout/MainLayout';
import NormalLayout from './layout/MainLayout/other';
import Homepage from './views/Homepage'
import './assets/css/plugins/remixicon.css';
import './assets/css/plugins/bootstrap.min.css';
import './assets/css/plugins/swiper-bundle.min.css';
import './assets/css/style.css';
import './assets/main.css';
import './App.css'
import { LOGOUT } from './actions/types';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

const useStyle = makeStyles({
  root: {
    bgColor: '#E9ECF2',
  }
})

const App = () => {
  const classes = useStyle();

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);


  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/admin/*' element={
          <MainLayout className={classes.root}>
            <MainRoutes />
          </MainLayout>} />
        <Route path='/marketplace/*' element={
          <NormalLayout className={classes.root}>
            <MarketplaceRoutes />
          </NormalLayout>
        } />
        <Route path='/create/*' element={
          <NormalLayout className={classes.root}>
            <CreateRoutes />
          </NormalLayout>
        } />
        <Route exact path='*' element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;

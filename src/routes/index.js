/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 20:34:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useLocation,
} from "react-router";
import Home from '../views/admin/Home';
import Nft from '../views/admin/Nft'
import Earning from '../views/admin/Earning'
import Order from '../views/admin/Order'
import History from '../views/admin/History'
import Settings from '../views/admin/Settings'

function MainRoutes() {

  useEffect(() => {
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/nft' element={<Nft />} />
      <Route path='/earning' element={<Earning />} />
      <Route path='/order' element={<Order />} />
      <Route path='/history' element={<History />} />
      <Route path='/settings' element={<Settings />} />
    </Routes>
  )
}

export default MainRoutes;
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
import Home from '../views/marketplace';
import ItemDetail from '../views/marketplace/item-detail'
import Profile from '../views/marketplace/profile'
import Create from '../views/create/single'
import AssetPath from '../helpers/AssetHelper.js'

function MainRoutes() {

    useEffect(() => {
    }, [])

    return (
        <div className="overflow-hidden">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/item-detail/:id' element={<ItemDetail />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/create/:id' element={<Profile />} />
                {/* <Route path='/nft' element={<Nft />} /> */}
            </Routes>
        </div>
    )
}

export default MainRoutes;
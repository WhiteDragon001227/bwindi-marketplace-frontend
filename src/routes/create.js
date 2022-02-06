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
import CreateSingle from '../views/create/single';

function MainRoutes() {

    useEffect(() => {
    }, [])

    return (
        <div className="overflow-hidden">
            <Routes>
                <Route path='/' element={<CreateSingle />} />
                {/* <Route path='/item-detail/*' element={<ItemDetail />} /> */}
                {/* <Route path='/nft' element={<Nft />} /> */}
            </Routes>
        </div>
    )
}

export default MainRoutes;
/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 20/01/2022 - 21:18:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react';

import { Box } from '@mui/material'
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MarketplaceLayout = (props) => {
    return (
        <>
            <Header />
            <Box className="mb-8 grid grid-cols-1 gap-8 mt-16">
                <div className="col-span-1">
                    {props.children}
                </div>
            </Box>
            <Footer />
        </>
    );
}

export default MarketplaceLayout
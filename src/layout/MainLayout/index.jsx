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

const MainLayout = (props) => {
  return (
    <>
      <Header />
      <Box className="mb-8 grid grid-cols-1 gap-8 mt-24 md:grid-cols-3 xl:grid-cols-4">
        <Sidebar className="h-auto col-span-1 md:col-span-1 xl:col-span-1" />
        <div className="col-span-1 ml-8 mr-8 md:col-start-2 md:col-end-5 md:ml-0">
          {props.children}
        </div>
      </Box>
      <Footer />
    </>
  );
}

export default MainLayout
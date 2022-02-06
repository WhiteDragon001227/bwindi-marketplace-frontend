/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 20:34:11
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import { Grid } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'

import CardCustomized from '../../ui-component/CardCustomized';
import CardWithImg from '../../ui-component/CardWithImg'

import Welcome from './Welcome'

const Home = (props) => {
  return (
    <div className="w-full">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 lg:col-span-3">
          <Welcome />
        </div>
        <div className="col-span-2 sm:col-span-1 lg:col-span-2">
          <CardCustomized
            icon={<ArrowForwardIos sx={{ fontSize: 'small' }}
            />}
            title='My NFTs'
          />
        </div>
        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <CardCustomized
            icon={<ArrowForwardIos sx={{ fontSize: 'small' }}
            />}
            title='Monthly Sales'
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <CardCustomized
            icon={<ArrowForwardIos sx={{ fontSize: 'small' }}
            />}
            title='My Orders'
          />
        </div>
        <div className="col-span-2 sm:col-span-1 lg:col-span-2">
          <CardCustomized
            icon={<ArrowForwardIos sx={{ fontSize: 'small' }}
            />}
            title='Transaction History'
          />
        </div>
      </div>
    </div>
  )
}

export default Home;
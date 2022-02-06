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

const Welcome = () => {
    return (
        <CardWithImg
            image={require('../../assets/img/bwindi-art02.png')}
            avatar={require('../../assets/img/profile.jpeg')}
        >
        </CardWithImg>
    )
}

export default Welcome;
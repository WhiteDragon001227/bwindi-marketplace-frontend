/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 23:05:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import CardCustomized from '../../ui-component/CardCustomized';
import bgimg from '../../assets/img/cardbg.svg'
import { Stack, Grid, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import AssetPath from '../../helpers/AssetHelper'


const Order = () => {
    return (
        <CardCustomized
            externalTitle='My Orders'
            walletAddress={true}
            sx={{ flexGrow: 3 }}
            bgimg={bgimg}
        >
            <Stack className="h-auto" alignItems='center' justifyContent='center' sx={{ minHeight: '500px' }}>
                <Typography variant="secondary">
                    You have not bought any items
                </Typography>
                <div className="mt-4">
                    <Typography className="text-center">
                        Go check out the marketplace and buy some cool items! Once you buy one you can download it's content here
                    </Typography>
                </div>
                <div className="mt-4">
                    <Button variant="filled-uncamel" sx={{ zIndex: '1000' }}>Browse Listings</Button>
                </div>
            </Stack>
        </CardCustomized>
    )
}

export default Order
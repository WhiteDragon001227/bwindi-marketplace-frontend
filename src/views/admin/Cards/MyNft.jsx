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
import CardCustomized from '../../../ui-component/CardCustomized';
import bgimg from '../../../assets/img/cardbg.svg'
import { Stack, Grid, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';

import NftCard from '../../../ui-component/NftCard'
import AssetPath from '../../../helpers/AssetHelper'


const MyNft = () => {
    return (
        <CardCustomized
            externalTitle='My NFTs'
            sx={{ flexGrow: 3 }}
            bgimg={bgimg}
        >
            <Stack className="h-auto" alignItems='center' justifyContent='center' sx={{ minHeight: '300px' }}>
                <Typography variant="secondary">
                    You have no items in your wallet
                </Typography>
                <Button variant="filled-uncamel" sx={{ zIndex: '1000' }}>Browse Items</Button>
            </Stack>
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
                <div className="col-span-1">
                    <NftCard img={AssetPath('img/bwindi-art02.png')}/>
                </div>
            </div> */}
        </CardCustomized>
    )
}

export default MyNft
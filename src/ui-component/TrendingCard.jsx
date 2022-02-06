/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 24/01/2022 - 20:34:57
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useState, useEffect } from 'react'
import Palette, { usePalette } from 'react-palette'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button } from '@mui/material';
import AssetPath from '../helpers/AssetHelper';

const TrendingCard = (props) => {
    const { data, loading, error } = usePalette(props.img)

    return (
        <Card variant="hover" className="w-full" style={{ backgroundColor: data.darkMuted }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={props.img}
                    alt="green iguana"
                    height="300"
                    style={{
                        objectFit: 'fill',
                        height: '300px'
                    }}
                />
                <CardContent style={{ height: '155px' }}>
                    <div className="flex justify-between flex-col items-center text-white px-2 h-full">
                        <div className="">
                            <div className="w-full text-1xl font-black text-center">
                                {props.title}
                            </div>
                            <div className="mt-2 w-full text-center leading-4">
                                {props.content}
                            </div>
                        </div>
                        <div className="">
                            <div className="mb-2">
                                <div className="rounded-lg px-2 font-medium" style={{ border: '1px solid #fff', background: 'none' }}>Live</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export default TrendingCard
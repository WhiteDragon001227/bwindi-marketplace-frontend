import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AssetPath from '../../helpers/AssetHelper.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import web3 from '../../connection/web3';
import Web3Context from '../../store/web3-context';
import IOSSwitch from '../switch/IOSSwitch'
import NFTCollectionContext from '../../store/NFTCollectionContext';
import NFTCollectionJson from '../../abis/NFTCollection.json';
import NFTMarketplaceContext from '../../store/NFTMarketplaceContext';
import BwindiSaleJson from '../../abis/BwindiSale.json';
import { ownerWindow } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import Bg from '../../assets/img/bwindi-art02.png';
import { toast } from 'react-toastify';
import NETWORKID from '../../config/networkId.json';

const PutOnAuctionDialog = (props) => {

    const networkId = NETWORKID.NETWORKID;
    const nftAddress = NFTCollectionJson.networks[networkId].address;
    const [instantPriceChecked, setInstantPriceChecked] = useState(true);
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [miniumPrice, setMiniumPrice] = useState(100);
    const [instantPrice, setInstantPrice] = useState(200);
    const handleInstantPriceChecked = () => {
        setInstantPriceChecked(!instantPriceChecked);
    };

    return (
        <Dialog open={props.open} /* onClose={() => props.handleClose('PutAuctionModal')} */ sx={{ padding: '15px' }} maxWidth='800px'>
            <div className="h-auto grid grid-cols-12">
                <div className="col-span-12 md:col-span-5 h-full" style={{
                    backgroundImage: `url(${Bg})`,
                    backgroundSize: 'cover',
                    borderRadius: '20px 0 0 20px'
                }}>
                </div>
                <div className="col-span-12 md:col-span-7 h-full">
                    <DialogTitle sx={{ textAlign: 'center', fontSize: '24px' }}>Put this NFT on Auction</DialogTitle>
                    <DialogContent>
                        <div className="w-256">
                            <div>
                                <TextField
                                    label="Minium Price"
                                    type="number"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '95%' }}
                                    value={miniumPrice}
                                    onChange={(e) => {
                                        setMiniumPrice(e.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                                    }}
                                    helperText="You will receive bids on this item"
                                />
                            </div>
                            <div className="hr"></div>
                            <div className="mt-4">
                                <FormControlLabel
                                    control={<><IOSSwitch checked={instantPriceChecked} onClick={handleInstantPriceChecked} />&nbsp;</>}
                                    label="Instant Price"
                                    sx={{
                                        marginLeft: '20px'
                                    }}
                                />
                            </div>
                            <div className="mt-4">
                                <TextField
                                    label="Instant Price"
                                    type="number"
                                    value={instantPrice}
                                    onChange={(e) => {
                                        setInstantPrice(e.target.value)
                                    }}
                                    disabled={!instantPriceChecked}
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '95%' }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                                    }}
                                    helperText="Set a price at which the item will be instantly sold"
                                />
                            </div>
                            <div className="hr"></div>
                            <div className="mt-4 ml-2 w-full">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        className="w-full"
                                        renderInput={(props) => <TextField {...props} sx={{
                                            width: '95%'
                                        }} />}
                                        label="Start Auction Day"
                                        value={startDate}
                                        onChange={(newValue) => {
                                            setStartDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className="mt-4 ml-2 w-full">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        className="w-full"
                                        renderInput={(props) => <TextField {...props} sx={{
                                            width: '95%'
                                        }} />}
                                        label="End Auction Day"
                                        value={endDate}
                                        onChange={(newValue) => {
                                            setEndDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.handleClose('PutAuctionModal')}>Cancel</Button>
                        <Button onClick={() => props.handleClose('PutAuctionModal')} variant="filled">&nbsp;&nbsp;Put&nbsp;&nbsp;</Button>
                    </DialogActions>
                </div>
            </div>
        </Dialog>
    )
}

export default PutOnAuctionDialog;
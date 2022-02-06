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

const PutOnSaleDialog = (props) => {
    const tokenId = props.tokenId;
    const networkId = NETWORKID.NETWORKID;
    const nftAddress = NFTCollectionJson.networks[networkId].address;
    const marketplaceAddress = BwindiSaleJson.networks[networkId].address;
    const [price, setPrice] = useState(1);
    const web3Ctx = useContext(Web3Context);
    const collectionContext = useContext(NFTCollectionContext);
    const marketplaceContext = useContext(NFTMarketplaceContext);
    const account = web3Ctx.account;
    const nftContract = collectionContext.contract;
    const marketplaceContract = marketplaceContext.contract;

    useEffect(() => {
        if (props.open && (!nftContract || !marketplaceContract)) {
            props.handleClose('PutSaleModal');
            toast.error('Something went wrong. Try again!');
            return;
        }
    }, [props]);
    const putOnSaleHandler = async () => {
        // try {
            console.log('putOnSaleHandler');
            console.log('nftContract', nftContract, marketplaceContract);
            await nftContract.methods.approve(marketplaceAddress, tokenId).send({ from : account });
            await marketplaceContract.methods.putOnSale(nftAddress, tokenId, web3.utils.toWei(price, "ether"), "0x0000000000000000000000000000000000000000").send({ from: account });
            toast.success('You put this nft on sale successfully!');
            props.handleClose('PutSaleModal');
            props.loadNFT(nftContract, marketplaceContract);
        // } catch (error) {
        //     toast.error('Something went wrong while putting on sale. Try again!');
        //     props.handleClose('PutSaleModal');
        // }
    }

    return (
        <Dialog open={props.open} /* onClose={() => props.handleClose('PutAuctionModal')} */ sx={{ padding: '15px' }} maxWidth='800px'>
            <div className="h-auto">
                <div className="w-full" style={{
                    backgroundImage: `url(${Bg})`,
                    backgroundSize: 'cover',
                    height: '150px',
                    borderRadius: '20px 20px 0px 0px'
                }}>
                </div>
                <div className="w-full">
                    <DialogTitle sx={{ textAlign: 'center', fontSize: '24px' }}>Put this NFT on Sale</DialogTitle>
                    <DialogContent>
                        <div className="w-256">
                            <div>
                                <TextField
                                    label="Price"
                                    type="number"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: '95%' }}
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">Eth</InputAdornment>,
                                    }}
                                    helperText="You will receive this price on this item"
                                />
                            </div>
                            <div className="hr"></div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.handleClose('PutSaleModal')}>Cancel</Button>
                        <Button onClick={putOnSaleHandler} variant="filled">&nbsp;&nbsp;Put&nbsp;&nbsp;</Button>
                    </DialogActions>
                </div>
            </div>
        </Dialog>
    )
}

export default PutOnSaleDialog;
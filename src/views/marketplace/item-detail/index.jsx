import React, { useEffect, useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AssetPath from '../../../helpers/AssetHelper.js';
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
import MoreMenu from '../../../ui-component/menu/more-menu';
import ShareMenu from '../../../ui-component/menu/share-menu';
import AuthMenu from '../../../ui-component/menu/auth-menu';
import ActionMenu from '../../../ui-component/menu/recent-action';
import web3 from '../../../connection/web3';
import Web3Context from '../../../store/web3-context';
import IOSSwitch from '../../../ui-component/switch/IOSSwitch'
import NFTCollectionContext from '../../../store/NFTCollectionContext';
import NFTCollectionJson from '../../../abis/NFTCollection.json';
import NFTMarketplaceContext from '../../../store/NFTMarketplaceContext';
import BwindiSaleJson from '../../../abis/BwindiSale.json';
import { getEllipsisTxt } from "../../../helpers/formatters";
import { toast } from 'react-toastify';
import { ownerWindow } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Bg from '../../../assets/img/bwindi-art02.png';
import NETWORKID from '../../../config/networkId.json';
import PutOnAuctionDialog from '../../../ui-component/dialog/PutOnAuctionDialog';
import PutOnSaleDialog from '../../../ui-component/dialog/PutOnSaleDialog';

const Item = (props) => {
    const networkId = NETWORKID.NETWORKID;
    const { id } = useParams();
    const web3Ctx = useContext(Web3Context);
    const account = web3Ctx.account;
    const nftAddress = NFTCollectionJson.networks[networkId].address;
    const collectionContext = useContext(NFTCollectionContext);
    const marketplaceContext = useContext(NFTMarketplaceContext);
    const [value, setValue] = React.useState('1');
    const [data, setData] = useState({});
    const [putAuctionModalOpen, setPutAuctionModalOpen] = React.useState(false);
    const [putSaleModalOpen, setPutSaleModalOpen] = React.useState(false);
    const [nftContract, setNFTContract] = useState();
    const [marketplaceContract, setMarketplaceContract] = useState();

    const handleOpen = (modalType) => {
        switch (modalType) {
            case 'PutSaleModal':
                setPutSaleModalOpen(true);
                break;
            case 'PutAuctionModal':
                setPutAuctionModalOpen(true);
                break;
            default:
        }
    };
    const handleClose = (modalType) => {
        switch (modalType) {
            case 'PutSaleModal':
                setPutSaleModalOpen(false);
                break;
            case 'PutAuctionModal':
                setPutAuctionModalOpen(false);
                break;
            default:
        }
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const loadNFT = async (nft, market) => {
        console.log('loadNFT');
        try {
            const tokenURI = await nft.methods.tokenURI(id).call();
            const creator = await nft.methods.creatorOf(id).call();
            let owner = await nft.methods.ownerOf(id).call();
            const isOnSale = await market.methods.isOnSale(nftAddress, id).call();
            let sale = await market.methods.nftContractSales(nftAddress, id).call();
            if (isOnSale) {
                owner = sale[1];    // This case, the owner has to the nft seller since the owner was changed to marketplace contract
            }

            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${tokenURI}`);
            if (!response.ok) {
                toast.error('Something went wrong');
                return;
                // throw new Error('Something went wrong');
            }

            const metadata = await response.json();
            setData({
                sale: sale,
                metadata: metadata,
                owner: owner,
                creator: creator,
                isOnSale: isOnSale
            })
        } catch {
            toast.error('Something went wrong. Try again!');
            return;
        }
    }
    const putOnSaleHandler = async () => {
        if (!marketplaceContract) {
            toast.error('Something went wrong!');
            return;
        }
        loadNFT(nftContract, marketplaceContract);
        handleOpen('PutSaleModal');
    }
    const putOnAuctionHandler = async () => {
        if (!marketplaceContract) {
            toast.error('Something went wrong!');
            return;
        }
        handleOpen('PutAuctionModal');
    }
    const cancelSaleHandler = async() => {
        await marketplaceContract.methods.cancelSale(nftAddress, id).send({ from: account });
        toast.success('Cancelled sale successfully!');
        loadNFT(nftContract, marketplaceContract);
    }
    const buyFromSaleHandler = async() => {
        await marketplaceContract.methods.buyFromSale(nftAddress, id).send({ from: account, value: data.sale.price.toString() });
        toast.success('Bought from sale successfully!');
        loadNFT(nftContract, marketplaceContract);
    }
    useEffect(() => {
        let tmpNFTContract, tmpMarketplaceContract
        const a = async () => {
            const loadContracts = async () => {
                if (collectionContext.contract)
                    tmpNFTContract = collectionContext.contract;
                else tmpNFTContract = await collectionContext.loadContract(web3, NFTCollectionJson, NFTCollectionJson.networks[networkId]);

                if (marketplaceContext.contract)
                    tmpMarketplaceContract = marketplaceContext.contract;
                else tmpMarketplaceContract = await marketplaceContext.loadContract(web3, BwindiSaleJson, BwindiSaleJson.networks[networkId]);
            };
            await loadContracts();
            setNFTContract(tmpNFTContract);
            setMarketplaceContract(tmpMarketplaceContract);
            await loadNFT(tmpNFTContract, tmpMarketplaceContract);
        }
        a();
    }, [props])
    return (
        <>
            <PutOnAuctionDialog open={putAuctionModalOpen} handleClose={handleClose} />
            <PutOnSaleDialog open={putSaleModalOpen} handleClose={handleClose} tokenId={id} loadNFT={loadNFT}/>

            <div className="container">
                <Link to="/marketplace" className="btn btn-white btn-sm my-5">
                    Back to home
                </Link>
                <div className="item_details">
                    <div className="row sm:sce-y-5">
                        <div className="col-lg-6">
                            <a href={data.metadata?.image} target="_blank">
                                <img className="item_img" src={data.metadata?.image} alt="" style={{ objectFit: 'fill', width: '90%', height: '565px' }} />
                            </a>
                        </div>
                        <div className="col-lg-6">
                            <div className="space-y-5">
                                <h3>{data.metadata?.name}</h3>
                                <div className="d-flex justify-content-between">
                                    <div className="space-x-2 d-flex align-items-center">
                                        <p>1 of 1</p>
                                        <Link to="#" className="likes space-x-1">
                                            <i className="ri-heart-3-fill"></i>
                                            <span className="txt_sm">2.1k</span>
                                        </Link>
                                    </div>
                                    <div className="space-x-2 d-flex align-items-center">
                                        <div className="share">
                                            <ShareMenu />
                                        </div>
                                        <div className="more">
                                            <MoreMenu />
                                        </div>
                                    </div>
                                </div>
                                <div className="dropdown">
                                    <AuthMenu />
                                </div>
                                <div className="box">
                                    <div className="space-y-5">
                                        <div className="mb-8_reset">
                                            <div>
                                                <TabContext value={value}>
                                                    <Box sx={{ borderBottom: '1', borderColor: 'divider' }} className="d-flex justify-content-between">
                                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                            <Tab label="Details" value="1" />
                                                            <Tab label="Bids" value="2" />
                                                            <Tab label="History" value="3" />
                                                        </TabList>
                                                        <div className="dropdown d-none d-sm-block">
                                                            <ActionMenu />
                                                        </div>
                                                    </Box>
                                                    <div className="hr"></div>
                                                    <TabPanel value="1">
                                                        <p>
                                                            {data.metadata?.description}
                                                        </p>
                                                    </TabPanel>
                                                    <TabPanel value="2">
                                                        <p>
                                                            No active bids yet. Be the first to make a bid!
                                                        </p>
                                                    </TabPanel>
                                                    <TabPanel value="3">
                                                        <div className="creator_item creator_card space-x-2 flex items-center justify-start">
                                                            <div className="avatars space-x-2">
                                                                <div className="media">
                                                                    <div className="badge">
                                                                        <img src={`${AssetPath("img/icons/Badge.svg")}`} alt="" />
                                                                    </div>
                                                                    <Link to="#">
                                                                        <img src={`${AssetPath("img/avatars/avatar_1.png")}`} alt="Avatar" className="avatar avatar-md" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <p className="color_black">Bid accepted&nbsp;
                                                                    <span className="color_brand">1 ETH</span> by&nbsp;
                                                                    <Link className="color_black txt_bold" to="#">ayoub</Link>
                                                                </p>
                                                                <span className="date color_text">28/06/2021, 12:08</span>
                                                            </div>
                                                        </div>
                                                    </TabPanel>
                                                </TabContext>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="numbers">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="space-y-1">
                                                <p className="color_text">Minimum bid</p>
                                                <h4>2.4000 <span className="txt_sm color_text">
                                                    ETH/ $4769.88</span></h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="space-y-1">
                                                <p className="color_text">countdown</p>
                                                <div className="d-flex countdown_item
													align-items-center">
                                                    <div className="item">
                                                        <div className="number hours">22<span></span></div>
                                                    </div>
                                                    <div className="dots">:</div>
                                                    <div className="item">
                                                        <div className="number minutes">04<span></span></div>
                                                    </div>
                                                    <div className="dots">:</div>
                                                    <div className="item">
                                                        <div className="number seconds">35<span></span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hr2"></div>
                                <div className="creators">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="avatars space-x-1">
                                                <div className="media">
                                                    <Link to="#">
                                                        <img
                                                            src={`${AssetPath("img/avatars/avatar_3.png")}`}
                                                            alt="Avatar" className="avatar
															avatar-sm" />
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to="#">
                                                        <p className="avatars_name color_black">
                                                            {
                                                                (data.creator) && (
                                                                    <>
                                                                        {
                                                                            (data.creator === account) ? (
                                                                                <> You </>
                                                                            ) : (
                                                                                <>
                                                                                    {getEllipsisTxt(data.creator, 6)}
                                                                                </>
                                                                            )
                                                                        }
                                                                    </>
                                                                )
                                                            }
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="avatars space-x-1">
                                                <div className="media">
                                                    <div className="badge">
                                                        <img className="badge"
                                                            src={`${AssetPath("img/icons/Badge.svg")}`}
                                                            alt="" />
                                                    </div>
                                                    <Link to="#">
                                                        <img
                                                            src={`${AssetPath("img/avatars/avatar_2.png")}`}
                                                            alt="Avatar" className="avatar avatar-sm" />
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link to="#">
                                                        <p className="avatars_name color_black">
                                                            {
                                                                (data.owner) && (
                                                                    <>
                                                                        {
                                                                            (data.owner === account) ? (
                                                                                <> You </>
                                                                            ) : (
                                                                                <>
                                                                                    {getEllipsisTxt(data.owner, 6)}
                                                                                </>
                                                                            )
                                                                        }
                                                                    </>
                                                                )
                                                            }
                                                        </p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex space-x-5 w-full justify-end items-center">
                                    {
                                        (data.owner === account) ? (
                                            <>
                                                <Link onClick={putOnAuctionHandler} to="#" className="btn btn-primary btn-md" data-toggle="modal"
                                                    data-target="#popup_buy">Put On Auction</Link>
                                                {
                                                    (data.isOnSale) ? (
                                                        <Link onClick={cancelSaleHandler} to="#" className="btn btn-orange btn-md" data-toggle="modal"
                                                            data-target="#popup_buy">Cancel Sale</Link>
                                                    ) : (
                                                        <Link onClick={putOnSaleHandler} to="#" className="btn btn-primary btn-md" data-toggle="modal"
                                                            data-target="#popup_buy">Put On Sale</Link>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <Link to="#" onClick={buyFromSaleHandler} className="btn btn-primary btn-lg" data-toggle="modal"
                                                    data-target="#popup_buy">Buy Now</Link>
                                                <Link to="#" className="btn btn-grad btn-lg" data-toggle="modal"
                                                    data-target="#popup_bid">Place bid</Link>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item;
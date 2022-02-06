import React, { useContext, useState, useEffect } from 'react';
import AssetPath from './../../helpers/AssetHelper.js';
import NFTCard from '../../ui-component/marketplace/NFTCard';
import { Link } from 'react-router-dom';
import SortMenu from '../../ui-component/menu/sort-menu';
import Config from '../../config/pinata.json';
import NETWORKID from '../../config/networkId.json';
import web3 from '../../connection/web3';
import Web3Context from '../../store/web3-context';
import NFTCollectionContext from '../../store/NFTCollectionContext';
import NFTCollectionJson from '../../abis/NFTCollection.json';
import NFTMarketplaceContext from '../../store/NFTMarketplaceContext';
import BwindiSaleJson from '../../abis/BwindiSale.json';
import { toast } from 'react-toastify';
import axios from 'axios';

const Marketplace = (props) => {
    const networkId = NETWORKID.NETWORKID;
    const nftCollectionContext = useContext(NFTCollectionContext);
    const web3Context = useContext(Web3Context);
    const nftMarketplaceContext = useContext(NFTMarketplaceContext);
    const nftAddress = NFTCollectionJson.networks[networkId].address;
    const [nftCollectionContract, setNFTCollectionContract] = useState();
    const [nftMarketplaceContract, setNFTMarketplaceContract] = useState();
    const [collections, setCollections] = useState([]);

    const loadContracts = async () => {
        let nft, market;
        if (!nftCollectionContext.contract) {
            const contract = await nftCollectionContext.loadContract(web3, NFTCollectionJson, NFTCollectionJson.networks[networkId]);
            setNFTCollectionContract(contract);
            nft = contract;
        }
        else {
            setNFTCollectionContract(nftCollectionContext.contract);
            nft = nftCollectionContext.contract;
        }
        console.log('Contract', nft, web3, window.ethereum);

        if (!nftMarketplaceContext.contract) {
            const contract = await nftMarketplaceContext.loadContract(web3, BwindiSaleJson, BwindiSaleJson.networks[networkId]);
            setNFTMarketplaceContract(contract);
            market = contract;
        }
        else {
            setNFTMarketplaceContract(nftMarketplaceContext.contract);
            market = nftMarketplaceContext.contract;
        }
        return { nft, market };
    };

    const loadNFTs = async (contract, market) => {
        let collections = [];
        let totalSupply = await contract.methods.totalSupply().call();
        for (let j = 0; j < totalSupply; j++) {
            let i = j + 1;
            const hash = await contract.methods.tokenURI(i).call();
            try {
                const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
                if (!response.ok) {
                    toast.error('Something went wrong');
                    return;
                    // throw new Error('Something went wrong');
                }

                const metadata = await response.json();
                let owner = await contract.methods.ownerOf(i).call();
                const creator = await contract.methods.creatorOf(i).call();
                const isOnSale = await market.methods.isOnSale(nftAddress, i).call();
                let sale = await market.methods.nftContractSales(nftAddress, i).call();
                if (isOnSale) {
                    owner = sale[1];
                    console.log('owner', i, owner);
                }

                collections = [...collections, {
                    id: i,
                    nft: metadata,
                    owner: owner,
                    creator: creator,
                    isOnSale: isOnSale
                }];
            } catch {
                toast.error('Something went wrong. Try again!');
                return;
            }
        }
        setCollections(collections);
    }

    useEffect(() => {
        (async () => {
            const { nft, market } = await loadContracts();
            await loadNFTs(nft, market);
        })();
    }, [props])

    return (
        <>
            <div className="bg_white border-b pt-14">
                <div className="container mt-10">
                    <div className="text-center text-6xl font-black">NFT Marketplace</div>
                    <div className="d-flex justify-content-center mt-16 pb-4 font-black">
                        <hr></hr>
                        <ul className="menu_categories space-x-5">
                            <li key={1}>
                                <a href="#" className="color_brand">
                                    <span> All </span>
                                </a>
                            </li>
                            <li key={2}> <a href="#">
                                <i className="ri-gamepad-line"></i> <span> Games </span>
                            </a>

                            </li>
                            <li key={3}> <a href="#">
                                <i className="ri-brush-line"></i> <span> Art </span>
                            </a>

                            </li>
                            <li key={4}> <a href="#">
                                <i className="ri-stock-line"></i> <span> Trading Cards </span>
                            </a>

                            </li>
                            <li key={5}> <a href="#">
                                <i className="ri-music-line"></i> <span> Music </span>
                            </a>

                            </li>
                            <li key={6}> <a href="#">
                                <i className="ri-global-line"></i> <span> Domain Names </span>
                            </a>

                            </li>
                            <li key={7}> <a href="#">
                                <i className="ri-emotion-laugh-line"></i> <span> Memes </span>
                            </a>

                            </li>
                            <li key={8}> <a href="#">
                                <i className="ri-layout-4-line"></i> <span> Collectibles </span>
                            </a>

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="section mt-16">
                    <div className="section__head">
                        <h2 className="section__title mb-2"> Artworks</h2>
                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-auto">
                                <div className="d-flex space-x-2 align-items-center">
                                    <span className="color_text txt_sm" style={{ minWidth: 'max-content' }}>
                                        FILTER BY:
                                    </span>
                                    <ul className="menu_categories space-x-5">
                                        <li className="d-flex space-x-2 switch_item" key={1}>
                                            <input type="checkbox" id="switch1" /><label
                                                htmlFor="switch1">Toggle</label>
                                            <span> Has list price </span>
                                        </li>
                                        <li className="d-flex space-x-2 switch_item" key={2}>
                                            <input type="checkbox" id="switch2" /><label
                                                htmlFor="switch2">Toggle</label>
                                            <span> Has open offer </span>
                                        </li>
                                        <li className="d-flex space-x-2 switch_item" key={3}>
                                            <input type="checkbox" id="switch3" /><label
                                                htmlFor="switch3">Toggle</label>
                                            <span> Owned by creator </span>
                                        </li>
                                        <li className="d-flex space-x-2 switch_item" key={4}>
                                            <input type="checkbox" id="switch4" /><label
                                                htmlFor="switch4">Toggle</label>
                                            <span> Has sold </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-auto">
                                <div className="d-flex space-x-2 align-items-center">
                                    <span className="color_text txt_sm"> SORT BY: </span>
                                    <SortMenu />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade popup" id="popup_bid_success" tabIndex="-1" role="dialog"
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="modal-body space-y-20 p-40">
                                    <h3 className="text-center">Your Bidding Successfuly Added</h3>
                                    <p className="text-center">your bid
                                        <span className="color_text txt_bold">(16ETH) </span> has been listing to our database
                                    </p>
                                    <a href="" className="btn btn-dark w-full"> Watch the listings</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade popup" id="popup_bid" tabIndex="-1" role="dialog"
                        aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="modal-body space-y-20 p-40">
                                    <h3>Place a Bid</h3>
                                    <p>You must bid at least <span className="color_black">15 ETH</span>
                                    </p>
                                    <input type="text" className="form-control"
                                        placeholder="00.00 ETH" />
                                    <p>Enter quantity. <span className="color_green">5 available</span>
                                    </p>
                                    <input type="text" className="form-control"
                                        value="1" />
                                    <div className="hr"></div>
                                    <div className="d-flex justify-content-between">
                                        <p> You must bid at least:</p>
                                        <p className="text-right color_black txt _bold"> 67,000 ETH </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p> service free:</p>
                                        <p className="text-right color_black txt _bold"> 0,901 ETH </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p> Total bid amount:</p>
                                        <p className="text-right color_black txt _bold"> 56,031 ETH </p>
                                    </div>
                                    <a href="" className="btn btn-primary w-full"
                                        data-toggle="modal"
                                        data-target="#popup_bid_success"
                                        data-dismiss="modal"
                                        aria-label="Close"> Place a bid
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade popup" id="popup_history" tabIndex="-1" role="dialog" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <button type="button" className="close" data-dismiss="modal"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="modal-body space-y-5 p-10">
                                    <h4> History </h4>
                                    <div className="creator_item creator_card space-x-2">
                                        <div className="avatars space-x-2">
                                            <div className="media">
                                                <div className="badge">
                                                    <img src={`${AssetPath("img/icons/Badge.svg")}`}
                                                        alt="" />
                                                </div>
                                                <a href="Profile.html">
                                                    <img
                                                        src={`${AssetPath("img/avatars/avatar_1.png")}`}
                                                        alt="Avatar"
                                                        className="avatar avatar-md" />
                                                </a>
                                            </div>
                                            <div>
                                                <p className="color_black">Bid accepted
                                                    <span className="color_brand">1 ETH</span> by
                                                    <a className="color_black txt_bold" href="Profile.html">ayoub</a>
                                                </p>
                                                <span className="date color_text">28/06/2021, 12:08</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="creator_item creator_card space-x-2">
                                        <div className="avatars space-x-2">
                                            <div className="media">
                                                <div className="badge">
                                                    <img src={`${AssetPath("img/icons/Badge.svg")}`}
                                                        alt="" />
                                                </div>
                                                <a href="Profile.html">
                                                    <img
                                                        src={`${AssetPath("img/avatars/avatar_2.png")}`}
                                                        alt="Avatar"
                                                        className="avatar avatar-md" />
                                                </a>
                                            </div>
                                            <div>
                                                <p className="color_black">Bid accepted
                                                    <span className="color_brand">3 ETH</span> by
                                                    <a className="color_black txt_bold" href="Profile.html">monir</a></p>
                                                <span className="date color_text">22/05/2021, 12:08</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-8_reset">
                        {
                            collections?.map((NFT, ndx) => {
                                return (
                                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                        <NFTCard id={NFT.id} nft={NFT.nft} owner={NFT.owner} creator={NFT.creator} ndx={ndx} isOnSale={NFT.isOnSale}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        </>
    )
};

export default Marketplace;
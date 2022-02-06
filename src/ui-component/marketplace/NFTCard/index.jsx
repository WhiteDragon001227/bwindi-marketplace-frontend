import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AssetPath from '../../../helpers/AssetHelper.js'
import web3 from '../../../connection/web3';
import Web3Context from '../../../store/web3-context';

const NFTCard = (props) => {

    const web3Context = useContext(Web3Context);
    const account = web3Context.account;

    return (
        <div className="card__item four" key={props.ndx}>
            <div className="card_body space-y-2">
                <div className="creators space-x-2">
                    <div className="avatars space-x-1">
                        <Link to="#">
                            <img src={`${AssetPath("img/avatars/avatar_1.png")}`}
                                alt="Avatar" className="avatar avatar-sm" />
                        </Link>
                        <Link to="#">
                            <p className="avatars_name txt_xs">{props.creator.substring(0, 6)}...</p>
                        </Link>
                    </div>
                    <div className="avatars space-x-1">
                        <Link to="#">
                            <img
                                src={`${AssetPath("img/avatars/avatar_2.png")}`}
                                alt="Avatar" className="avatar avatar-sm" />
                        </Link>
                        <Link to="#">
                            <p className="avatars_name txt_xs">{props.owner.substring(0, 6)}...</p>
                        </Link>
                    </div>
                </div>
                <div className="card_head">
                    <Link to={`/marketplace/item-detail/${props.id}`}>
                        <img src={props.nft.image} alt="" />
                    </Link>

                    <Link to="#" className="likes space-x-3">
                        <i className="ri-heart-3-fill"></i>
                        <span className="txt_sm">1.2k</span>
                    </Link>
                </div>
                <h6 className="card_title">
                    {props.nft.name}
                </h6>
                <div className="card_footer d-block space-y-2">
                    <div className="card_footer justify-content-between">
                        <div className="creators">
                            <p className="txt_sm"> 4 in stock</p>
                        </div>
                        <Link to="#" className="">
                            <p className="txt_sm">Price:
                                <span className="color_green txt_sm">2.45 ETH</span>
                            </p>
                        </Link>
                    </div>
                    <div className="hr"></div>
                    <div className="flex items-center space-x-2 justify-between">
                        <div className="flex items-center space-x-2">
                            <i className="ri-history-line"></i>
                            <Link className="view_history" to="#" data-toggle="modal"
                                data-target="#popup_history">
                                <p className="color_text txt_sm" style={{ width: 'auto' }}> View History </p>
                            </Link>
                        </div>
                        <div className="">
                            {
                                (account && account === props.owner) ? (
                                    <Link className="btn btn-sm btn-green w-full" to="#" data-toggle="modal" data-target="#popup_bid">
                                        Edit
                                    </Link>
                                ) : (
                                    <>
                                        {
                                            (props.isOnSale) ? (
                                                <Link className="btn btn-sm btn-primary" to="#" data-toggle="modal" data-target="#popup_bid">
                                                    Place Bid
                                                </Link>
                                            ) : (
                                                <span style={{ color: 'red' }}>Not For Sale</span>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default NFTCard;
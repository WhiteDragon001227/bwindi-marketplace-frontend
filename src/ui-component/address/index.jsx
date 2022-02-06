/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 14/01/2022 - 13:01:39
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../account/blockie";
import "./identicon.css";
// import { Skeleton } from "antd";
import Web3Context from '../../store/web3-context';

const styles = {
  address: {
    height: "36px",
    display: "flex",
    gap: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center",
  },
  span: {
    marginTop: 20 + 'px'
  }
};

function Address(props) {

  const [address, setAddress] = useState();
  const [isClicked, setIsClicked] = useState(false);
  
  const web3Ctx = useContext(Web3Context)
  const balance = web3Ctx.balance
  const account = web3Ctx.account
  const chainId = web3Ctx.networkId

  useEffect(() => {
    setAddress(props?.address || (account));
  }, [account, props]);

  if (!address) 
    // return <Skeleton paragraph={{ rows: 1, width: "100%" }} title={false} active />;
    return (<></>)

  const Copy = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1780FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer" }}
      onClick={() => {
        navigator.clipboard.writeText(address);
        setIsClicked(true);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );

  return (
    <div style={{ ...styles.address, ...props.style }}>
      {props.avatar === "left" && <Blockie address={address} size={7} />}
      <p style={{cursor: 'pointer'}} onClick={props.onClick} title="Change Account">{props.size ? getEllipsisTxt(address, props.size) : address}</p>
      {props.avatar === "right" && <Blockie address={address} size={7} />}
      {props.copyable && (isClicked ? <Check /> : <Copy />)}
    </div>
  );
}

export default Address;

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#21BF96"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);

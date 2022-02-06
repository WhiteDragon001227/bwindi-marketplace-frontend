/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 14/01/2022 - 12:38:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, {useContext} from 'react';
import { Skeleton } from "antd";
import Blockies from "react-blockies";
import Web3Context from '../../store/web3-context';

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const web3Ctx = useContext(Web3Context)
  const balance = web3Ctx.balance
  const account = web3Ctx.account

  if (!props.address && (!account)) return <Skeleton.Avatar active size={40} />;

  return (
    <Blockies seed={props.currentWallet ? account.toLowerCase() : props.address.toLowerCase()} className="identicon" {...props} />
  );
}

export default Blockie;

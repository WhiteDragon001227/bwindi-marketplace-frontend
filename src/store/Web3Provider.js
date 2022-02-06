/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 21:29:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useReducer } from 'react';

import Web3Context from './web3-context';
import { setAlert } from '../actions/alert';
import { toast } from 'react-toastify';

const defaultWeb3State = {
  account: null,
  networkId: null,
  balance: null
};

const web3Reducer = (state, action) => {
  if (action.type === 'ACCOUNT') {
    console.log('Account Dispatch')
    return {
      account: action.account,
      networkId: state.networkId,
      balance: state.balance
    };
  }

  if (action.type === 'NETWORKID') {
    return {
      account: state.account,
      networkId: action.networkId,
      balance: state.balance
    };
  }

  if (action.type === 'BALANCE') {
    return {
      account: state.account,
      networkId: state.networkId,
      balance: action.balance
    };
  }

  return defaultWeb3State;
};

const Web3Provider = props => {
  const [web3State, dispatchWeb3Action] = useReducer(web3Reducer, defaultWeb3State);

  const loadAccountHandler = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    let balance = await web3.eth.getBalance(account);
    balance = (balance / 1e18).toFixed(3);
    dispatchWeb3Action({ type: 'ACCOUNT', account: account });
    dispatchWeb3Action({ type: 'BALANCE', balance: balance });
    return account;
  };

  const loadBalanceHandler = async (web3) => {
    let balance = await web3.eth.getBalance(web3State.account);
    balance = (balance / 1e18).toFixed(3);
    dispatchWeb3Action({ type: 'BALANCE', balance: balance });
    return balance;
  }

  const loadNetworkIdHandler = async (web3) => {
    const networkId = await web3.eth.net.getId();
    dispatchWeb3Action({ type: 'NETWORKID', networkId: networkId });
    return networkId;
  };

  const connectWalletHandler = async (web3) => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // await window.ethereum.request({
      //     method: 'wallet_switchEthereumChain',
      //     params: [{ chainId: '0x1' }],
      // });
    } catch (error) {
      console.error('Metamask Error is here', error);
      if (error.code === 4001) {
        console.log(error, '4001')
        toast.error('You rejected the metamask');
      }
      return error;
    }
    const account = await loadAccountHandler(web3);
    const networkId = await loadNetworkIdHandler(web3);
    window.ethereum.on('accountsChanged', async (accounts) => {
      await loadAccountHandler(web3);
    })
    // Metamask Event Subscription - Network changed
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
    setAlert('Connected metamask successfully!', 'success');

    return account
  }

  const changeAccountHandler = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{
        eth_accounts: {}
      }]
    });
  }

  const setAccountNullHandler = async () => {
    dispatchWeb3Action({ type: 'ACCOUNT', account: null });
  }

  const web3Context = {
    account: web3State.account,
    networkId: web3State.networkId,
    balance: web3State.balance,
    loadAccount: loadAccountHandler,
    loadNetworkId: loadNetworkIdHandler,
    loadBalance: loadBalanceHandler,
    connectWallet: connectWalletHandler,
    changeAccount: changeAccountHandler,
    setAccountNull: setAccountNullHandler,
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
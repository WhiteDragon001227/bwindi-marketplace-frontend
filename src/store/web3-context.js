/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 25/12/2021 - 21:34:41
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 25/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react';

const Web3Context = React.createContext({
  account: null,
  networkId: null,
  balance: null,
  loadAccount: () => { },
  loadNetworkId: () => { },
  loadBalance: () => { },
  connectWallet: () => { },
  changeAccount: () => { },
  setAccountNull: () => { }
});

export default Web3Context;
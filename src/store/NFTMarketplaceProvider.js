/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 16/12/2021 - 03:44:27
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useReducer } from 'react';

import HexToNumber from '../utils/math';
import Context from './NFTMarketplaceContext';
import NumberToBN from 'number-to-bn';

const defaultState = {
  contract: null,
};

const reducer = (state, action) => {
  let tmp = {
    contract: action.contract
  };

  if (action.type === 'CONTRACT') {
    return {
      contract: action.contract
    };
  }

  return defaultState;
};

const Provider = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const loadContractHandler = (web3, json, deployedNetwork) => {
    const contract = deployedNetwork ? new web3.eth.Contract(json.abi, deployedNetwork.address) : '';
    dispatch({ type: 'CONTRACT', contract: contract });
    return contract;
  };

  const context = {
    contract: state.contract,
    loadContract: loadContractHandler,
  };

  return (
    <Context.Provider value={context}>
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
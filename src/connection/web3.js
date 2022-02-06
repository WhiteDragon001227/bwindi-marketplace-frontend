/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 20/12/2021 - 14:17:06
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import Web3 from 'web3';

// Web 3 connection
const web3 = window.ethereum ? new Web3(window.ethereum) : null; 

export default web3;
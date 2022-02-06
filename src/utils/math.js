/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 16/12/2021 - 21:17:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import web3 from '../connection/web3';
import NumberToBN from 'number-to-bn';

const HexToNumber = (bn) => {
    if (web3) {
        if (bn._hex)
            return web3.utils.hexToNumber(bn._hex).toString();
        return bn;
    }
    return 0;
}

export default HexToNumber;
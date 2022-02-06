/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 20/12/2021 - 08:53:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react';

const Context = React.createContext({
  contract: null,
  loadContract: () => { },
});

export default Context;
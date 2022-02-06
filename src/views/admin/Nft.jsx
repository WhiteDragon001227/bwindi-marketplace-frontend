/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/01/2022 - 20:32:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React from 'react'
import Welcome from './Welcome'
import MyNft from './Cards/MyNft'

const Nft = () => {

  return (
    <>
      <div className="mb-4">
        <Welcome />
      </div>
      <MyNft />
    </>
  );
}

export default Nft;
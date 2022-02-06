/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 13/01/2022 - 13:57:24
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/01/2022
    * - Author          : Winner
    * - Modification    : 
**/

/* eslint no-undef: "off"*/
const AssetPath = (path) => {
    var Img = require(`../assets/${path}`);
    return Img;
    // return `../assets/${path}`
}

export default AssetPath
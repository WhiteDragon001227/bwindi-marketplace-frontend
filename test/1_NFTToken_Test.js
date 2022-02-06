/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 19/12/2021 - 06:12:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2021
    * - Author          : Winner
    * - Modification    : 
**/
const { AssertionError } = require('chai')
const truffleAssert = require('truffle-assertions');
const Web3 = require('web3');

require('chai')
    .use(require('chai-as-promised'))
    .should()

const owner = "0xA1A330C558Dd61f3A915BEeCabd846E375Cef5cE";
const other = "0xa068D6d693DAf399Bf9Db3dd675B9819eF199020";

const NFTCollection = artifacts.require("../src/contracts/NFTCollection.sol")
let NFTCollectionInstance;
var BN = web3.utils.BN;

// const SpeciesToken = artifacts.require("./CowNFT/SpeciesToken.sol");

contract("CowNFT", function (accounts) {

    before(async () => {
        NFTCollectionInstance = await NFTCollection.deployed(owner);
    })

    describe("NFTCollection", function () {

        it("Test Wei", async function () {
            await NFTCollectionInstance
                .createTokens([], [], { from: other, value: web3.utils.toWei('0.01', 'Ether') })
        })

        // it ("Init Check", async function() {
        //     let TOKEN_COUNT = await cowNFTInstance.TOKEN_COUNT();
        //     let TYPE_COUNT = await cowNFTInstance.TYPE_COUNT();
        //     assert.equal(TOKEN_COUNT, 1, "TOKEN COUNT Mismatch");
        //     assert.equal(TYPE_COUNT, 1, "TOKEN COUNT Mismatch");
        // });

        // it ("Set Base URL", async function() {
        //     let base_url = await cowNFTInstance.base_url();
        //     assert.equal(base_url, "https://farmenergy.mypinata.cloud/ipfs/");
        //     let tx = await cowNFTInstance.setBaseURI("ASDF");
        //     truffleAssert.eventEmitted(tx, 'EventSetBaseURL', (ev) => {
        //         console.log('Sender', ev.sender);
        //         console.log('baseURL', ev.baseURL);
        //         return true;
        //     });
        // });

        // it ("Setting Type Check", async function() {
        //     let tx = await cowNFTInstance.addType('Cow1', 'My First Cow', 'Cow1Pinata', 0, 1000);
        //     truffleAssert.eventEmitted(tx, 'EventType', (ev) => {
        //         console.log('TypeCount', ev.TYPE_COUNT);
        //         console.log('baseURL', JSON.stringify(ev.cow_type));
        //         return true;
        //     });
        //     tx = await cowNFTInstance.addType('Cow2', 'My Second Cow', 'Cow2Pinata', 0, 2000);
        //     truffleAssert.eventEmitted(tx, 'EventType', (ev) => {
        //         console.log('TypeCount', ev.TYPE_COUNT);
        //         console.log('baseURL', JSON.stringify(ev.cow_type));
        //         return true;
        //     });

        //     // tx = await cowNFTInstance.setType(1, 'Cow 1', 'My 1st Cow', 'Cow1Pinata', 0, 2000);
        //     // truffleAssert.eventEmitted(tx, 'EventType', (ev) => {
        //     //     console.log('Sender', ev.TYPE_COUNT);
        //     //     console.log('baseURL', JSON.stringify(ev.cow_type));
        //     //     return true;
        //     // });
        // });

        // it ("Update Metahash Check", async function() {
        //     let ids = [1, 2];
        //     let meta_hashes = ['Cow1', 'Cow2'];
        //     let tx = await cowNFTInstance.updateMetaHashes(ids, meta_hashes);
        //     truffleAssert.eventEmitted(tx, 'MetaHashesUpdated', (ev) => {
        //         console.log('TypeCount', ev.contractAddress);
        //         console.log('baseURL', ev.creator);
        //         return true;
        //     });
        //     let meta_hash = await cowNFTInstance.cow_types(1);
        //     console.log('Meta Hash', JSON.stringify(meta_hash));
        //     meta_hash = await cowNFTInstance.cow_types(2);
        //     console.log('Meta Hash', JSON.stringify(meta_hash));
        // });

        // it ("Update MaxSupply Check", async function() {
        //     let ids = [1, 2];
        //     let max_supplys = [3000, 4000];
        //     let tx = await cowNFTInstance.updateMaxSupplys(ids, max_supplys);
        //     truffleAssert.eventEmitted(tx, 'EventMaxSupplys', (ev) => {
        //         console.log('TypeCount', ev.contractAddress);
        //         console.log('baseURL', ev.creator);
        //         return true;
        //     });
        //     let meta_hash = await cowNFTInstance.cow_types(1);
        //     console.log('Meta Hash', JSON.stringify(meta_hash));
        //     meta_hash = await cowNFTInstance.cow_types(2);
        //     console.log('Meta Hash', JSON.stringify(meta_hash));
        // });

        // it ("Create Tokens Check", async function() {
        //     let ids = [1, 2];
        //     let amounts = [20, 20];
        //     let tx = await cowNFTInstance.createTokens(ids, amounts, {from: other, value: 2});
        //     truffleAssert.eventEmitted(tx, 'TokensCreated', (ev) => {
        //         console.log('TypeCount', ev.contractAddress);
        //         console.log('baseURL', ev.creator);
        //         return true;
        //     });

        //     ids = [1, 2];
        //     amounts = [10, 20];
        //     tx = await cowNFTInstance.createTokens(ids, amounts, {from: other, value: 2});
        //     truffleAssert.eventEmitted(tx, 'TokensCreated', (ev) => {
        //         console.log('TypeCount', ev.contractAddress);
        //         console.log('baseURL', ev.creator);
        //         return true;
        //     });

        //     let result = await cowNFTInstance.typesStatus({from: other});
        //     let {0: _cow_types, 1: mines} = result;
        //     console.log('Result', JSON.stringify(result));
        //     console.log('Cow Types', JSON.stringify(_cow_types));
        //     console.log('Mines', JSON.stringify(mines));
        // });

        // it ("Initialize & Create CowNFT ", async function() {
        //     let meta_hashes = ['1', '2', '3'];
        //     let amounts = [100, 200, 300];
        //     let tx = await cowNFTInstance.createTokens(meta_hashes, amounts, { from: owner });
        //     truffleAssert.eventEmitted(tx, 'TokensCreated', (ev) => {
        //         console.log('EV', tx.contractAddress);
        //         return true;
        //     });

        //     let TOKEN_COUNT = await cowNFTInstance.TOKEN_COUNT();
        //     assert.equal(new BN(TOKEN_COUNT), 4, "TOKEN_COUNT UNMATCHED!");
        //     console.log('TOKEN_COUNT:', new BN(TOKEN_COUNT));
        // })

        // it ("Update Metahash", async function() {
        //     let meta_hash = await cowNFTInstance.meta_hashes(1);
        //     let meta_hash1 = await cowNFTInstance.meta_hashes(3);
        //     assert.equal(meta_hash, '1', "Meta Hash Not Matched!");
        //     assert.equal(meta_hash1, '3', "Meta Hash Not Matched!");

        //     await cowNFTInstance.updateMetaHash(3, '33');
        //     meta_hash1 = await cowNFTInstance.meta_hashes(3);
        //     assert.equal(meta_hash1, '33', "Meta Hash Not Matched!");
        // });

        // it ("Add Animal", async function() {
        //     var result = await cowNFTInstance.add_animal("cow")
        //     let event
        //     event = result.logs[0].args

        //     assert.equal(event.success, false, "Name only Exist")
        //     console.log(event.msg)

        //     var result = await cowNFTInstance.add_animal("dog")
        //     event = result.logs[0].args

        //     assert.equal(event.success, true, "Success")
        //     console.log(event.msg)
        // })

        // it ("Add Specie", async function() {
        //     var tx = await cowNFTInstance.add_species_into_animal("rabbit", "My Rabbit1", "", 10, "BNB", 10**5)
        //     let event
        //     event = tx.logs[0]

        //     truffleAssert.eventEmitted(tx, 'AddSpecieResult', (ev) => {
        //         console.log(ev.msg, ev.to)
        //         return ev.success === false;
        //     });

        //     tx = await cowNFTInstance.add_species_into_animal("cow", "My Cow1", "", 10, "BNB", 10**5)
        //     tx = await cowNFTInstance.add_species_into_animal("cow", "My Cow2", "", 20, "BNB", 10**5)
        //     tx = await cowNFTInstance.add_species_into_animal("cow", "My Cow3", "", 30, "BNB", 10**5)

        //     truffleAssert.eventEmitted(tx, 'AddSpecieResult', (ev) => {
        //         console.log(ev.msg, ev.to)
        //         return ev.success === true;
        //     });

        //     // assert.equal(event.success, true, "Successfully Species Added")
        //     // console.log(event.msg)
        //     // console.log(event.address)
        // })

        // /*
        // event TransferBatch(
        //     address indexed operator,
        //     address indexed from,
        //     address indexed to,
        //     uint256[] ids,
        //     uint256[] values
        // );
        // */

        // var ids = [0, 2];
        // var amounts = [10, 10];
        // var from, to;

        // it ("Presale Token Test", async function() {

        //     var tx = await cowNFTInstance.presale_token(ids, amounts)

        //     truffleAssert.eventEmitted(tx, 'TransferBatch', async (ev) => {
        //         console.log('Msg Sender', ev.operator)
        //         console.log('From Account', ev.from)
        //         console.log('To Account', ev.to)
        //         // console.log('Function Return Value:', tx);
        //         from = ev.from, to = ev.to;
        //         return ev.operator == ev.from
        //     });
        // })

        // it ("Balance Check", async function() {
        //     let balance1 = await cowNFTInstance.balanceOfBatch([from, to], ids);
        //     console.log('Balances:', new BN(balance1[0]).toNumber());
        //     console.log('Balances:', new BN(balance1[1]).toNumber());
        // })
    })

})

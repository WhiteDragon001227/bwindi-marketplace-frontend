/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 14/01/2022 - 12:37:30
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import web3 from '../../connection/web3';
import Web3Context from '../../store/web3-context';
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "./blockie";
import { Button, Card, Modal, Spin } from "antd";
import React, { useState, useContext } from "react";
import Address from "../address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import AssetPath from "../../helpers/AssetHelper";
import Config from '../../config/config.js'

const styles = {
    account: {
        height: "50px",
        padding: "0 25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "fit-content",
        borderRadius: "12px",
        backgroundColor: "rgb(11, 27, 39)",
        cursor: "pointer",
    },
    text: {
        fontSize: "1.1rem",
        color: "#FFFFFF",
    },
    connector: {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "auto",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "20px 5px",
        cursor: "pointer",
    },
    icon: {
        alignSelf: "center",
        fill: "rgb(40, 13, 95)",
        flexShrink: "0",
        marginBottom: "8px",
        height: "30px",
    },
    connectButton: {
        padding: '0px 20px !important'
    }
};

const Account = (props) => {
    const web3Ctx = useContext(Web3Context)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingState, setLoadingState] = useState(false)
    const balance = web3Ctx.balance
    const account = web3Ctx.account
    const chainId = web3Ctx.networkId

    console.log('chainId', "0x" + chainId?.toString(16))

    const ConnectWallet = async () => {
        console.log('connectwallet')
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: Config.chainId }],
            });
        } catch (error) {
            console.error('Erorr', error);
        }

        setLoadingState(true)
        // Load account
        const account = await web3Ctx.loadAccount(web3);
        // Load Network ID
        const networkId = await web3Ctx.loadNetworkId(web3);

        window.ethereum.on('accountsChanged', async (accounts) => {
            let tmpAccount = await web3Ctx.loadAccount(web3);
        })

        // Metamask Event Subscription - Network changed
        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });
        setLoadingState(false)
    }

    const changeAccountHandler = async () => {
        await window.ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        });
        setIsModalVisible(false)
    }

    if (loadingState) {
        return (
            <>
                <Spin />Connecting Metamask... <img width="45" src={`${AssetPath("img/icons/metamask.svg")}`} alt="" />
            </>
        )
    }

    if (!account) {
        return (
            <React.Fragment>
                <button className="btn btn-grad mr-1" style={{ padding: '0px 20px !important' }} onClick={ConnectWallet}>
                    <i className="ri-wallet-3-line"></i>
                    &nbsp;Connect wallet
                </button>
                <img width="45" src={`${AssetPath("img/icons/metamask.svg")}`} alt="" />
            </React.Fragment>
        );
    }

    return (
        <>
            <div style={styles.account} onClick={() => setIsModalVisible(true)}>
                <p style={{ marginRight: "10px", ...styles.text }}>{getEllipsisTxt(account, 6)}</p>
                <Blockie currentWallet scale={3} />
            </div>
            <img width="45" src={`${AssetPath("img/icons/metamask.svg")}`} alt="" />
            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
                bodyStyle={{
                    padding: "15px",
                    fontSize: "17px",
                    fontWeight: "500",
                }}
                style={{ fontSize: "16px", fontWeight: "500" }}
                width="400px"
            >
                Account
                <Card
                    style={{
                        marginTop: "10px",
                        borderRadius: "1rem",
                    }}
                    bodyStyle={{ padding: "15px" }}
                >
                    <Address onClick={changeAccountHandler} avatar="left" size={6} copyable style={{ fontSize: "20px" }} />
                    <div style={{ marginTop: "10px", padding: "0 10px" }}>
                        <a href={`${getExplorer("0x" + chainId?.toString(16))}/address/${account}`} target="_blank" rel="noreferrer">
                            <SelectOutlined style={{ marginRight: "5px" }} />
                            View on Explorer
                        </a>
                    </div>
                </Card>
                <Button
                    size="large"
                    type="primary"
                    style={{
                        width: "100%",
                        marginTop: "10px",
                        borderRadius: "0.5rem",
                        fontSize: "16px",
                        fontWeight: "500",
                    }}
                    onClick={async () => {
                        window.location.reload()
                        // await logout();
                        // window.localStorage.removeItem("connectorId");
                        // setIsModalVisible(false);
                    }}
                >
                    Disconnect Wallet
                </Button>
            </Modal>
        </>
    );
}

export default Account;

/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 22/01/2022 - 13:32:12
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/01/2022
    * - Author          : Winner
    * - Modification    : 
**/

import * as React from 'react';
import { Button, Typography, Modal } from '@mui/material';
import { SingleBedOutlined } from '@mui/icons-material';
import Bg from '../assets/img/bwindi-art02.png'
import AssetPath from '../helpers/AssetHelper.js'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '648px',
    backgroundColor: '#FAFAFA',
    boxShadow: 24,
    borderRadius: '20px'
};

const Signin = (props) => {

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <div className="grid grid-cols-12 h-full">
                        <div className="col-span-12 md:col-span-5 h-full" style={{
                            backgroundImage: `url(${Bg})`,
                            backgroundSize: 'cover',
                            borderRadius: '20px 0 0 20px'
                        }}>
                        </div>
                        <div className="col-span-12 md:col-span-7 h-full">
                            <div className="h-full mx-auto lg:w-4/5 w-4/5 flex flex-col justify-center py-8">
                                <h1 className="font-bold text-3xl text-black">Sign in with your wallet</h1>
                                <span className="mt-4">Sign in with one of available wallet providers or create a new wallet.</span>
                                <span className="mt-4" style={{ color: '#567DE3' }}>What is a wallet?</span>
                                <div className="mt-10">
                                    <Button className="w-full h-10" variant="filled-secondary">
                                        <img width="45" src={`${AssetPath("img/icons/metamask.svg")}`} alt="" /> &nbsp;&nbsp;
                                        Sign in with metamask
                                    </Button>
                                </div>
                                <span className="mt-10">
                                    We do not own your private keys and cannot access your funds without your confirmation.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Signin
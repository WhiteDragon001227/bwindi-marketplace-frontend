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

import React, { useState, useContext, useEffect } from 'react';
import { Divider, Button, Typography, Modal, TextField, Checkbox, InputAdornment } from '@mui/material';
import { SingleBedOutlined } from '@mui/icons-material';
import Bg from '../assets/img/bwindi-art02.png'
import AssetPath from '../helpers/AssetHelper.js'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import web3 from '../connection/web3';
import Web3Context from '../store/web3-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSolid, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    minHeight: '648px',
    backgroundColor: '#FAFAFA',
    boxShadow: 24,
    borderRadius: '20px'
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Signin = (props) => {
    const { login, isAuthenticated } = props;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = formData;
    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        props.handleClose()
        login({ email, password });
    };
    const web3Ctx = useContext(Web3Context);
    const [account, setAccount] = useState(null);
    const [loadingState, setLoadingState] = useState(false);
    const connectWallet = async () => {
        setLoadingState(true)
        let res = await web3Ctx.connectWallet(web3)
        props.handleClose()
        setLoadingState(false)
    }
    useEffect(() => {
    }, [props])

    if (isAuthenticated || account) {
        return (<></>);
    }
    return (
        <>
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
                                <h1 className="font-bold text-3xl" style={{ color: '#4D6194' }}>Welcome back</h1>
                                <span className="mt-4">You’re just a step away from buying and selling digital items to earn some cool cash.</span>
                                <div className="mt-10 flex flex-col gap-5">
                                    <TextField className="w-full" name="email" id="email" label="Email" variant="outlined" sx={{ borderRadius: '8px' }}
                                        onChange={onChange} value={email} required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SupervisorAccountIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <TextField className="w-full" id="password" label="Password" variant="outlined" sx={{ borderRadius: '8px' }}
                                        type="password" name="password" onChange={onChange} value={password} minLength="6"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                </div>
                                <div className="mt-10">
                                    <Button className="w-full h-10" variant="filled-uncamel" onClick={onSubmit}>
                                        Sign in
                                    </Button>
                                </div>
                                <div className="text-center w-full mt-4">
                                    Don't have an account?&nbsp;&nbsp;
                                    <span className="hover:underline" onClick={() => {
                                        props.handleOtherOpen()
                                        props.handleClose()
                                    }} style={{ cursor: 'pointer', color: '#4D61BB' }}>Sign Up</span>
                                </div>
                                <div className="mt-4">
                                    <Divider variant="label">OR</Divider>
                                </div>
                                <div className="mt-4 flex flex-col justify-center">
                                    <h1 className="font-bold text-3xl" style={{ color: '#4D6194' }}>Sign in with your wallet</h1>
                                    <span className="mt-4">Sign in with one of available wallet providers or create a new wallet.</span>
                                    <span className="mt-4" style={{ color: '#567DE3' }}>What is a wallet?</span>
                                    <div className="mt-10">
                                        {
                                            loadingState ? (
                                                <Button className="w-full h-10" variant="filled-secondary" onClick={connectWallet} disabled >
                                                    <FontAwesomeIcon icon={faSpinner} spin />
                                                    <img width="45" src={`${AssetPath("img/icons/metamask.svg")}`} alt="" /> &nbsp;&nbsp;
                                                    Sign in with metamask
                                                </Button>
                                            ) : (
                                                <Button className="w-full h-10" variant="filled-secondary" onClick={connectWallet} >
                                                    <img width="45" src={`${AssetPath("img/icons/metamask.svg")}`} alt="" /> &nbsp;&nbsp;
                                                    Sign in with metamask
                                                </Button>
                                            )
                                        }
                                    </div>
                                    <span className="mt-10">
                                        We do not own your private keys and cannot access your funds without your confirmation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

Signin.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Signin)
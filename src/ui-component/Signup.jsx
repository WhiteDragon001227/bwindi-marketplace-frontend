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

import React, { useState } from 'react';
import { Button, Typography, Modal, TextField, Checkbox, InputAdornment } from '@mui/material';
import { SingleBedOutlined } from '@mui/icons-material';
import Bg from '../assets/img/bwindi-art02.png'
import AssetPath from '../helpers/AssetHelper.js'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import Validator from 'validator';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    // minHeight: '648px',
    backgroundColor: '#FAFAFA',
    boxShadow: 24,
    borderRadius: '20px'
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Signup = (props) => {
    const { setAlert, register, isAuthenticated } = props
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [errorFormData, setErrorFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [validation, setValidation] = useState(false);
    const [policyAgree, setPolicyAgree] = useState(false);
    const { name, email, password, password2 } = formData;
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('validator', Validator.isEmail(email));
        if (name === '' || email === '') {
            setValidation(true);
        }
        if (!policyAgree) {
            setAlert('You have to agree our policy first', 'warning');
            setValidation(true);
            return;
        }
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
            setValidation(true);
            return;
        } else {
            register({ name, email, password });
        }
    };
    const onChangePolicyAgree = () => {
        setPolicyAgree(!policyAgree);
    }

    if (isAuthenticated) {
        return (
            <>Authenticated</>
        )
    }

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
                                <h1 className="font-bold text-3xl" style={{ color: '#4D6194' }}>Create an account</h1>
                                <span className="mt-4">Sign in with one of available wallet providers or create a new wallet.</span>
                                <span className="mt-10">
                                    You’re just a step away from buying and selling digital items to earn some cool cash
                                </span>
                                <div className="mt-10 flex flex-col gap-5">
                                    <TextField className="w-full" id="username" label="Username" variant="outlined" sx={{ borderRadius: '8px' }}
                                        value={name} onChange={onChange} name="name"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SupervisorAccountIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <TextField className="w-full" id="email" label="E-mail" variant="outlined" sx={{ borderRadius: '8px' }}
                                        value={email} onChange={onChange} name="email"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <TextField className="w-full" id="password" label="Password" variant="outlined" sx={{ borderRadius: '8px' }}
                                        type="password" value={password} onChange={onChange} name="password"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <TextField className="w-full" id="password" label="Password Confirm" variant="outlined" sx={{ borderRadius: '8px' }}
                                        type="password" value={password2} onChange={onChange} name="password2"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyIcon />
                                                </InputAdornment>
                                            ),
                                        }} />
                                    <div className="flex justify-start" onClick={onChangePolicyAgree} style={{ cursor: 'pointer' }}>
                                        <div><Checkbox checked={policyAgree} /></div>
                                        <div className="mt-1">
                                            Creating an account means you accept our <span style={{ color: '#4D61BB' }}>Terms of Service </span>
                                            and <span style={{ color: '#4D61BB' }}>Privacy Policy</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <Button className="w-full h-10" variant="filled-uncamel" onClick={onSubmit}>
                                        Create Account
                                    </Button>
                                </div>
                                <div className="text-center w-full mt-4">
                                    Have an account?&nbsp;&nbsp;
                                    <span className="hover:underline" onClick={() => {
                                        props.handleOtherOpen()
                                        props.handleClose()
                                    }} style={{ cursor: 'pointer', color: '#4D61BB' }}>Sign In</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Signup);

// export default Signup
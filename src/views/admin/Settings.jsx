/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 22/01/2022 - 04:21:22
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useContext, useState } from 'react'
import Welcome from './Welcome'
import { Button, Switch, TextField, Stack, Typography } from '@mui/material'
import CardCustomized from '../../ui-component/CardCustomized';
import web3 from '../../connection/web3';
import bgimg from '../../assets/img/cardbg.svg'
import Web3Context from '../../store/web3-context';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import Signup from '../../ui-component/Signup'

const Settings = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email_subscription: false,
        about: '',
        twitter: '',
        reddit: '',
        instagram: '',
        youtube: '',
        facebook: '',
    });
    const {
        getCurrentProfile,
        auth: { user, isAuthenticated },
        profile: { profile },
    } = props;
    const web3Ctx = useContext(Web3Context);
    const account = web3Ctx.account;

    return (
        <>
            <div className="mb-4">
                <Welcome />
            </div>
            <div className="">
                <CardCustomized
                    externalTitle='Settings'
                    sx={{ flexGrow: 3 }}
                    walletAddress={true}
                    bgimg={!isAuthenticated && bgimg}>
                    {
                        (/* account &&  */!isAuthenticated) ? (
                            <Stack className="h-auto" alignItems='center' justifyContent='center' sx={{ minHeight: '500px' }}>
                                <Typography sx={{ color: 'red', textAlign: 'center' }}>
                                    You don't have any user account with this wallet. <br></br>Sign up today!
                                </Typography>
                                <div className="mt-4">
                                    <Button variant="filled-uncamel" sx={{ zIndex: '1000' }}>Sign up</Button>
                                </div>
                            </Stack>
                        ) : (
                            <>
                                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                                    <div className="col-span-1">
                                        <div className="text-2xl font-medium">Profile</div>
                                        <div className="mt-4 flex flex-col gap-5">
                                            <TextField className="w-full" id="display_name" label="Display Name" required variant="outlined" 
                                                sx={{ borderRadius: '8px' }}/*  value={user ? user.name : 'Unnamed'} onChange={handleChange} *//>
                                            <TextField className="w-full" id="wallet_address" label="Wallet Address" disabled variant="outlined" 
                                                sx={{ borderRadius: '8px' }}/*  value={account || 'Not connected to wallet'} onChange={handleChange} *//>
                                            <TextField
                                                className="w-full"
                                                id="outlined-multiline-static"
                                                label="About"
                                                multiline
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="text-2xl font-medium">Social Media</div>
                                        <div className="mt-4 flex flex-col gap-5">
                                            <TextField className="w-full" id="twitter" label="Twitter" variant="outlined" sx={{ borderRadius: '8px' }} />
                                            <TextField className="w-full" id="reddit" label="Reddit" variant="outlined" sx={{ borderRadius: '8px' }} />
                                            <TextField className="w-full" id="instagram" label="Instagram" variant="outlined" sx={{ borderRadius: '8px' }} />
                                            <TextField className="w-full" id="youtube" label="Youtube" variant="outlined" sx={{ borderRadius: '8px' }} />
                                            <TextField className="w-full" id="facebook" label="Facebook" variant="outlined" sx={{ borderRadius: '8px' }} />
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="mb-8">
                                            <div className="text-2xl font-medium">Email Subscriptions</div>
                                            <div className="mt-4 flex flex-col gap-5">
                                                <Switch defaultChecked />
                                                <span>
                                                    Disable email notifications. (You won't recieve ANY emails from Mintable if you do this - including important ones related to your account security or purchases)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-2xl font-medium">Password</div>
                                            <div className="mt-4 flex flex-col gap-5">
                                                <Button variant="filled">Change Password</Button>
                                                <span>Improve your security with a strong password.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center items-center mt-8">
                                    <Button variant="filled" className="w-4/5 h-12">Save Changes</Button>
                                </div>
                            </>
                        )
                    }
                </CardCustomized>
            </div>
        </>
    );
}

Settings.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getCurrentProfile })(Settings);
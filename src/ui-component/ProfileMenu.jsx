/**
    * @description      : 
    * @author           : Winner
    * @group            : 
    * @created          : 24/01/2022 - 05:15:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/01/2022
    * - Author          : Winner
    * - Modification    : 
**/
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import web3 from '../connection/web3';
import Web3Context from '../store/web3-context';
import { getEllipsisTxt } from "../helpers/formatters";
import Address from './address'
import { getExplorer } from "../helpers/networks";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { getCurrentProfile } from '../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileMenu = (props) => {
    const navigate = useNavigate();
    const {
        getCurrentProfile,
        auth: { user, isAuthenticated },
        profile: { profile },
        logout
    } = props
    const web3Ctx = useContext(Web3Context);
    const [loadingState, setLoadingState] = useState(false)
    const balance = web3Ctx.balance
    const [account, setAccount] = useState(web3Ctx.account)
    const chainId = web3Ctx.networkId
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const connectWallet = async () => {
        if (account) return;
        if (loadingState) {
            toast.error('There is another pending, please wait!')
            return
        }
        setLoadingState(true)
        let res = await web3Ctx.connectWallet(web3)
        if (res.code != 4001) {
            console.log(res, '4001')
            setAccount(res)
        }
        setLoadingState(false)
        handleClose()
    }
    const logoutHandler = () => {
        web3Ctx.setAccountNull();
        logout();
    }
    useEffect(() => {
    }, [props])
    useEffect(() => {
    }, [])
    if (!account && !isAuthenticated) return (<></>)
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{user?.name[0].toUpperCase()}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgColor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    navigate('/admin/settings');
                }} key={1}>
                    <Avatar />
                    {
                        isAuthenticated ? user?.name : 'Unnamed'
                    }
                </MenuItem>
                <MenuItem onClick={connectWallet} key={2}>
                    <ListItemIcon>
                        <AccountBalanceWalletIcon />
                    </ListItemIcon>
                    {
                        account ? getEllipsisTxt(account, 6) : (
                            <>
                                {
                                    loadingState && (
                                        <>
                                            <FontAwesomeIcon icon={faSpinner} spin />&nbsp;
                                        </>
                                    )
                                }
                                Connect Wallet
                            </>
                        )
                    }
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                    handleClose();
                    navigate('/admin');
                }} key={3}>
                    <ListItemIcon>
                        <PersonAdd />
                    </ListItemIcon>
                    To Admin Panel
                </MenuItem>
                <MenuItem onClick={logoutHandler} key={4}>
                    <ListItemIcon>
                        <Logout />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

ProfileMenu.propTypes = {
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, logout })(ProfileMenu);
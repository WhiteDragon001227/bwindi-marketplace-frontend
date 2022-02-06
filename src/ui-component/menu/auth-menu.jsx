import React from 'react';
import { Link } from 'react-router-dom';
import MenuTheme from './menu-theme';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import AssetPath from '../../helpers/AssetHelper.js';

const AuthMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <button className="btn btn-white btn-sm
                dropdown-toggle" type="button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={ handleClick }>
                View proof of authenticity
            </button>
            <Menu
                id="basic-menu"
                className="rounded-lg"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                // PaperProps={MenuTheme}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="#" target="_blank">
                        <div className="flex justify-start itmes-center">
                            <img src={`${AssetPath("img/icons/ipfs.svg")}`} width="20"
                                alt="" />
                            &nbsp;View on IPFS&nbsp;
                            <i className="ri-external-link-line color_brand"></i>
                        </div>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="#" target="_blank">
                        <div className="flex justify-start itmes-center">
                            <img src={`${AssetPath("img/icons/ether.png")}`} width="20" alt="" />
                            &nbsp;View on Etherscan&nbsp;
                            <i className="ri-external-link-line color_brand"></i>
                        </div>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default AuthMenu;
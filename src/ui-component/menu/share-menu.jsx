import React from 'react';
import { Link } from 'react-router-dom';
import MenuTheme from './menu-theme';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const ShareMenu = (props) => {
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
            <div className="icon"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={ handleClick }>
                <Link to="#"> <i className="ri-share-line"></i> </Link>
            </div>
            <Menu
                id="basic-menu"
                className="rounded-lg"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose} key={1}>
                    <Link to="#"
                        data-toggle="modal"
                        data-target="#popup_report">
                        <i className="ri-facebook-line"></i>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} key={2}>
                    <Link to="#"
                        data-toggle="modal"
                        data-target="#popup_report">
                        <i className="ri-messenger-line"></i>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} key={3}>
                    <Link to="#"
                        data-toggle="modal"
                        data-target="#popup_report">
                        <i className="ri-whatsapp-line"></i>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} key={4}>
                    <Link to="#"
                        data-toggle="modal"
                        data-target="#popup_report">
                        <i className="ri-youtube-line"></i>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default ShareMenu;
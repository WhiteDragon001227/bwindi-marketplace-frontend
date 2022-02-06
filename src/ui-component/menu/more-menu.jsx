import React from 'react';
import { Link } from 'react-router-dom';
import MenuTheme from './menu-theme';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

const MoreMenu = (props) => {
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
            <div className="icon" aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={ handleClick }>
                <Link to="#"> <i className="ri-more-fill"></i> </Link>
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
                // PaperProps={MenuTheme}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="#"
                        data-toggle="modal"
                        data-target="#popup_report">
                        <i className="ri-flag-line"></i>
                        Report
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default MoreMenu;
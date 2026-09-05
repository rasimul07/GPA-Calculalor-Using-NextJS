'use client';
import React from "react";
import {
    Divider,
    ListItemIcon,
    Avatar,
    Tooltip,
    IconButton,
    MenuItem,
} from "@mui/material";
import { Box } from "@mui/material";
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';
import "../index.css";
import { useRouter } from "next/navigation";
import { clearStoredToken } from "../utils/authSession";

const AccountMenu = ({ email, userId }) => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            {email ? (
                <Tooltip title="Account settings">
                    <IconButton onClick={handleClick}>
                        <Avatar alt={email} src="/static/images/avatar/1.jpg"></Avatar>
                    </IconButton>
                </Tooltip>
            ) : null}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    router.push(userId ? `/${userId}` : '/profile');
                }}>
                    <Avatar 
                    sx={{ width: '2rem', height: '2rem', mr: 1.5 }}
                    /> Profile
                </MenuItem>
                <Divider />

                <MenuItem onClick={() => {
                    handleClose();
                    clearStoredToken();
                    window.location.href = '/';
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default AccountMenu;

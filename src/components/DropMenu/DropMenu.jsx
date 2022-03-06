import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function DropMenu() {

    // No longer using the drop menu in the app bar, decided on the footer navbar instead.
    // Leaving here for reference if I need to use one later on.

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const goHome = () => {
        history.push('/');
        handleClose();
    }

    const goAddMovie = () => {
        history.push('/add')
        handleClose();
    }

    const goWatchList = () => {
        history.push('/watchlist')
    }

    return (

        <div>

            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={goHome}>Home</MenuItem>
                <MenuItem onClick={goAddMovie}>Add A Movie</MenuItem>
                <MenuItem onClick={goWatchList}>Watchlist</MenuItem>
            </Menu>
        </div>
    )
}

export default DropMenu;
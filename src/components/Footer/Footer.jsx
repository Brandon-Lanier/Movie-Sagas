import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import TheatersIcon from '@mui/icons-material/Theaters';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Footer() {

    const history = useHistory();

    const goHome = () => {
        history.push('/')
    }

    const goWatch = () => {
        history.push('/watchlist')
    }

    const goAdd = () => {
        history.push('/add')
    }

    return (
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff'}} elevation={5}>
                <BottomNavigation showLabels
                >
                    <BottomNavigationAction label="Add Movie" icon={<AddCircleIcon />} onClick={goAdd}/>
                    <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={goHome}/>
                    <BottomNavigationAction label="Watchlist" icon={<TheatersIcon />} onClick={goWatch}/>
                </BottomNavigation>
            </Paper>
        </Box>

    )
}

export default Footer;
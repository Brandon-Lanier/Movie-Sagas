import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DropMenu from '../DropMenu/DropMenu';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { useState } from 'react';



function Header() {

    const [selectMovie, setSelectMovie] = useState('')

    const movieList = useSelector(store => store.movies);

    const movieSearch = () => {
        // Not fully functional yet
        console.log('Searching Movie');
    }

    return (
        <AppBar position="static" >
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                {/* <DropMenu /> */}
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                >
                    Movie Sagas
                </Typography>
                    <Autocomplete
                        id="moviesearch"
                        freeSolo
                        value={selectMovie}
                        options={movieList.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} label="Search A Movie" sx={{width:"300px"}} onChange={(e) => setSelectMovie(e.target.value)}/>}
                    /> 
            </Toolbar>
        </AppBar>
        
    )
}

export default Header;

  
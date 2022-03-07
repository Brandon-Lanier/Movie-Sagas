import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DialogModal from '../DialogModal/DialogModal';
import { Container, Box, Typography, FormControl, Select, MenuItem, InputLabel, Paper } from '@mui/material';

function AddDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // Get a list of all available genres
    const genres = useSelector(store => store.genres)

    const history = useHistory();
    const dispatch = useDispatch();

    // Default state of movie object to send to server
    const movieState = {
        title: '',
        poster: '',
        description: '',
        genres: ''
    };

    const [newMovie, setNewMovie] = useState(movieState);
    const [showDialog, setShowDialog] = useState(false); // Handles opening and closing dialog


    const addMovie = (event) => {
        // If all fields have valid inputs, continue
        if (newMovie.title, newMovie.poster, newMovie.description, newMovie.genres) {
            event.preventDefault();
            dispatch({ type: 'ADD_MOVIE', payload: newMovie });
            setNewMovie(movieState);
            setOpen(false)
            history.push('/'); // Go back to homepage after entering movie
        }
        else {
            // If a field is not filled out, display dialog
            setShowDialog(true);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <AddCircleIcon variant="outlined" onClick={handleClickOpen} />
            <Dialog open={open} onClose={handleClose}>
                <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        elevation={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '400px',
                            p: '10px',
                        }}
                    >
                        <DialogTitle>Add A Movie</DialogTitle>
                        <DialogContent>
                            <FormControl sx={{ width: '100%' }}>
                                <TextField
                                    sx={{ margin: '10px' }}
                                    type="text"
                                    label="Movie Title"
                                    required
                                    value={newMovie.title}
                                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                                />
                                <TextField
                                    sx={{ margin: '10px' }}
                                    type="text"
                                    required
                                    label="Movie Poster URL"
                                    value={newMovie.poster}
                                    onChange={(e) => setNewMovie({ ...newMovie, poster: e.target.value })
                                    }
                                />
                                <TextField
                                    sx={{ margin: '10px' }}
                                    required
                                    multiline
                                    rows="5"
                                    label=" Movie Description"
                                    value={newMovie.description}
                                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })
                                    }
                                />
                            </FormControl>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '10px',
                                }}
                            >
                                <FormControl sx={{ width: '80%'}}>
                                    <InputLabel id="select-genres-label">Select Genre</InputLabel>
                                    <Select
                                        labelId="select-genres-label"
                                        id="select-genres"
                                        label="Select Genres"
                                        value={newMovie.genres}
                                        onChange={(e) => setNewMovie({ ...newMovie, genres: e.target.value })}
                                    >
                                        {genres.map((genre) => (
                                            <MenuItem key={genre.id} value={genre.id}>
                                                {genre.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                sx={{ margin: '10px' }}
                                variant="outlined"
                                color="primary"
                                onClick={handleClose}
                            >
                                <Typography variant="h6">Cancel</Typography>
                            </Button>
                            <Button
                                variant="contained"
                                onClick={addMovie}
                                sx={{ margin: '10px' }}
                            >
                                <Typography variant="h6">Submit</Typography>
                            </Button>
                        </DialogActions>
                    </Paper>
                </Container>
            </Dialog>
        </div>
    )
}

export default AddDialog;
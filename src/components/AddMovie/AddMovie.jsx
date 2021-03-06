import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DialogModal from '../DialogModal/DialogModal';
import { Container, Box, Typography, TextField, Button, FormControl, Select, MenuItem, InputLabel, Paper } from '@mui/material';


//Not using this anymore.  Now using the Add Dialog component because I wanted it as a dialog popup.
function AddMovie() {

    
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
            history.push('/'); // Go back to homepage after entering movie
        }
        else {
            // If a field is not filled out, display dialog
            setShowDialog(true);
        }
    }

    const handleClose = () => {
        setShowDialog(false);
    };

    return (
        <>
            <Container sx={{ mt: '30px', display: 'flex', justifyContent: 'center' }}>
                <Paper
                    elevation={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '500px',
                        p: '20px',
                    }}
                >
                    <FormControl sx={{ width: '100%' }}>
                        <Typography variant="h4" sx={{ mb: '30px' }}>
                            Add A Movie
                        </Typography>
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
                        ></TextField>
                    </FormControl>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '10px',
                        }}
                    >
                        <FormControl sx={{ width: '80%', margin: 'auto' }}>
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
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mt: '10px',
                        }}
                    >
                        <Button
                            sx={{ margin: '10px' }}
                            variant="outlined"
                            color="error"
                            onClick={() => history.push('/')}
                        >
                            <Typography variant="h6">Cancel</Typography>
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={addMovie}
                            sx={{ margin: '10px' }}
                        >
                            <Typography variant="h6">Submit</Typography>
                        </Button>
                    </Box>
                </Paper>
            </Container>
            {showDialog && <DialogModal />}
        </>
    )
}

export default AddMovie;
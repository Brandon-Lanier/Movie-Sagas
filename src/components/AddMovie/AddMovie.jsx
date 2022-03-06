import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Paper,
} from '@mui/material';

function AddMovie() {

    const movieState = {
        genres: [],
        title: '',
        poster: '',
        description: '',
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    const [newMovie, setNewMovie] = useState(movieState);
    const dispatch = useDispatch();

    const genres = useSelector(store => store.genres)

    const saveMovie = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_MOVIE', payload: newMovie });
        setNewMovie(movieState);
    }


    return (
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
                        onChange={(e) =>
                            setNewMovie({ ...newMovie, title: e.target.value })
                        }
                    />
                    <TextField
                        sx={{ margin: '10px' }}
                        type="text"
                        required
                        label="Movie Poster URL"
                        value={newMovie.poster}
                        onChange={(e) =>
                            setNewMovie({ ...newMovie, poster: e.target.value })
                        }
                    />
                    <TextField
                        sx={{ margin: '10px' }}
                        required
                        multiline
                        rows="5"
                        label=" Movie Description"
                        value={newMovie.description}
                        onChange={(e) =>
                            setNewMovie({ ...newMovie, description: e.target.value })
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
                            onChange={(e) =>
                                setNewMovie({ ...newMovie, genres: e.target.value })
                            }
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
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push('/')}
                    >
                        <Typography variant="h6">Cancel</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={saveMovie}
                        sx={{ margin: '10px' }}
                    >
                        <Typography variant="h6">Submit</Typography>
                    </Button>
                    </Box>
            </Paper>
        </Container>
    )
}

export default AddMovie;
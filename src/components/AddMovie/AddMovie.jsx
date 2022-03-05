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
                    width: '700px',
                    p: '50px',
                }}
            >
                <FormControl sx={{ width: '100%' }}>
                    <Typography variant="h4" sx={{ mb: '30px' }}>
                        Add A Movie
                    </Typography>
                    <TextField
                        sx={{ m: '10px' }}
                        type="text"
                        label="Movie Title"
                        required
                        value={newMovie.title}
                        onChange={(event) =>
                            setNewMovie({ ...newMovie, title: event.target.value })
                        }
                    />
                    <TextField
                        sx={{ m: '10px' }}
                        type="text"
                        required
                        label="Movie Poster URL"
                        value={newMovie.poster}
                        onChange={(event) =>
                            setNewMovie({ ...newMovie, poster: event.target.value })
                        }
                    />
                    <TextField
                        sx={{ m: '10px' }}
                        required
                        multiline
                        rows="6"
                        label="Add Movie Description"
                        value={newMovie.description}
                        onChange={(event) =>
                            setNewMovie({ ...newMovie, description: event.target.value })
                        }
                    ></TextField>
                </FormControl>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        mt: '10px',
                    }}
                >
                    <FormControl sx={{ width: '53%' }}>
                        <InputLabel id="select-genres-label">Select Genre</InputLabel>
                        <Select
                            labelId="select-genres-label"
                            id="select-genres"
                            label="Select Genres"
                            multiple
                            value={newMovie.genres}
                            onChange={(event) =>
                                setNewMovie({ ...newMovie, genres: event.target.value })
                            }
                        >
                            {genres.map((genre) => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        sx={{ height: '56px', width: '21%' }}
                        variant="contained"
                        color="error"
                        onClick={() => history.push('/')}
                    >
                        <Typography variant="h6">Cancel</Typography>
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={saveMovie}
                        sx={{ height: '56px', width: '21%' }}
                    >
                        <Typography variant="h6">Submit</Typography>
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default AddMovie;
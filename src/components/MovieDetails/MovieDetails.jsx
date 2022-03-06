import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Fade } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './MovieDetails.css'


function MovieDetails() {

    const dispatch = useDispatch();
    const history = useHistory();

    // Store the page params as a variable to access the movies data
    const { id } = useParams();

    const details = useSelector(store => store.details);
    const genresArray = useSelector(store => store.genreDetails)


    useEffect(() => {
        // Upon load, get the selected movie details and genre for the movie based on the params id
        dispatch({ type: 'GET_DETAILS', payload: id });
        dispatch({ type: 'FETCH_GENRE_DETAILS', payload: id });
    }, []);


    // Default state for updating the movie title and description
    const updateState = {
        title: '',
        description: ''
    }

    // Storing the local updates to the movie title and description in here
    const [update, setUpdate] = useState(updateState);

    //Handles opening the edit dialog
    const [open, setOpen] = useState(false);

    // Handles updating the selected movie
    const updateMovie = (e) => {
        e.preventDefault();
        // Sending dispatch to saga to handle the edit movie function
        dispatch({ type: 'EDIT_MOVIE', payload: { update, id } });
        setOpen(false); // Close the edit dialog
        setUpdate(updateState); // reset the edit state to default
        dispatch({ type: 'GET_DETAILS', payload: id }); // Needs to be done to show the updated edits
    }

    const handleClickOpen = () => {
        // Opens edit Dialog box.
        setOpen(true);
    };

    const handleCloseEdit = () => {
        //Handles closing the dialog box
        setOpen(false);
        setUpdate(updateState);
    }

    // Default styles for images render on this page
    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    // Handles the added to watchlist alert 
    const [openAlert, setOpenAlert] = useState(false);

    const alert = () => {
        // Will open the MUI snackbar upon adding to favorites
        setOpenAlert(!openAlert);
    }

    const handleClose = () => {
        setOpenAlert(false);
    };

    const addWatchList = () => {
        // Send to saga to add a movie to the watchlist
        dispatch({ type: 'ADD_WATCHLIST', payload: id })
        alert(); //
    }

    const goBack = () => {
        // Go back to movie list
        history.push('/');
    }

    const searchGenre = (genre) => {
        // Handles click of a genre to see other movies that have the same genre
        console.log('In Search genre', genre);
        history.push(`/genres/${genre.name}`)
    }



    return (
        <>
            <Box sx={{ mt: '10px' }} >
                <Button onClick={goBack}>Back To List</Button>
            </Box>
            <Fade in="true" out="close" mountOnEnter unmountOnExit>
                <Paper
                    sx={{
                        p: 2,
                        margin: 'auto',
                        mt: '10px',
                        maxWidth: 500,
                        flexGrow: 1,
                        elevation: 5,

                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase sx={{ width: 200, height: 300 }}>
                                <Img alt="complex" src={details.poster} />
                            </ButtonBase>
                            <Grid item>
                                <Typography variant="h6" color="text.primary">
                                    Genres:
                                </Typography>
                                <Stack direction="column" spacing={1}>
                                    {genresArray.map(genre => (
                                        <Chip key={genre.id} label={genre.name} onClick={() => searchGenre(genre)} />
                                    ))}
                                </Stack>

                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {details.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {details.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button sx={{ m: '0' }} onClick={handleClickOpen}>Edit Details</Button>
                                </Grid>
                                <Grid item>
                                    <Button sx={{ m: '0' }} onClick={addWatchList}>Add To Watchlist</Button>
                                    {openAlert && <Snackbar
                                        open={alert}
                                        onClose={handleClose}
                                        autoHideDuration={2000}
                                        message="Added To Watchlist"

                                    />}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
            {open && <Dialog open={open} onClose={handleCloseEdit}>
                <DialogTitle>Edit Movie</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edit {details.title}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        placeholder={details.title}
                        variant="standard"
                        value={update.title}
                        onChange={(e) => setUpdate({ ...update, title: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        rows="5"
                        fullWidth
                        label=" Movie Description"
                        margin="dense"
                        id="description"
                        type="text"
                        placeholder={details.description}
                        variant="standard"
                        value={update.description}
                        onChange={(e) => setUpdate({ ...update, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={updateMovie}>Update Movie</Button>
                </DialogActions>
            </Dialog>}
        </>
    )
}


export default MovieDetails;

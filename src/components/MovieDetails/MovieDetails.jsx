import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Fade } from '@mui/material';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import EditDialog from '../EditDialog/EditDialog';
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
    const { id } = useParams();

    const details = useSelector(store => store.details);
    const genresArray = useSelector(store => store.genreDetails)


    useEffect(() => {
        dispatch({ type: 'GET_DETAILS', payload: id });
        dispatch({ type: 'FETCH_GENRE_DETAILS', payload: id });
    }, []);


    const updateState = {
        title: '',
        description: ''
    }

    const [update, setUpdate] = useState(updateState)
    const [open, setOpen] = useState(false)

    const updateMovie = (e) => {
        console.log('Update movie is', update);
        e.preventDefault();
        dispatch({type: 'EDIT_MOVIE', payload: {update, id}});
        setOpen(false);
        setUpdate(updateState);
        dispatch({ type: 'GET_DETAILS', payload: id });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseEdit = () => {
        setOpen(false);
        setUpdate(updateState);
    }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const [openAlert, setOpenAlert] = useState(false);

    const alert = () => {
        // Will open the MUI snackbar upon adding to favorites
        setOpenAlert(!openAlert);
    }

    const handleClose = () => {
        setOpenAlert(false);
      };

    const addWatchList = () => {
        dispatch({ type: 'ADD_WATCHLIST', payload: id })
        alert();
    }

    const goBack = () => {
        // Go back to movie list
        history.push('/');
    }

    const searchGenre = (genre) => {
        console.log('In Search genre', genre);
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
                                    <Typography sx={{ cursor: 'pointer' }} variant="body1" onClick={handleClickOpen}>
                                        Edit Details
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body1" onClick={addWatchList}>
                                        Add To Watchlist
                                    </Typography>
                                    {openAlert &&<Snackbar
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
                        onChange={(e) => setUpdate({...update, title: e.target.value})}
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
                        onChange={(e) => setUpdate({...update, description: e.target.value})}
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

// <Container>
// <h3>{details.title}</h3>
// <p>{details.description}</p>
// <img src={details.poster} />

// <h3>Genres:</h3>
// <ul>
//     {genresArray.map((genre, i) => (
//         <li key={i}>
//             {genre.name}
//         </li>
//     ))}
// </ul>
// <Link to="/">Go back</Link>
// </Container>
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
        setTimeout(() => {
            setOpenAlert(false);
        }, 3000);
    }, []);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const handleRemove = () => {
        console.log('In Remove Function', id);
    }

    const [openAlert, setOpenAlert] = useState(false);

    const alert = () => {
        // Will open the MUI alert upon adding to favorites
        setOpenAlert(!openAlert);
    }

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
            {openAlert && <Alert severity="success">Movie Added To Watchlist!</Alert>}
            <Box sx={{ mt: '10px' }}>
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
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
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
                                    <Typography sx={{ cursor: 'pointer' }} variant="body1" onClick={handleRemove}>
                                        Edit Details
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{ cursor: 'pointer' }} variant="body1" onClick={addWatchList}>
                                        Add To Watchlist
                                    </Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Fade>
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
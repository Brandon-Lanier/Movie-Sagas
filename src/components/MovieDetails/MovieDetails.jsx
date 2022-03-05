import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import './MovieDetails.css'

function MovieDetails() {

    const dispatch = useDispatch();

    const details = useSelector(store => store.details);
    const genresArray = useSelector(store => store.genreDetails)

    const { id } = useParams();

    useEffect(() => {
        // dispatch({ type: 'GET_DETAILS', payload: id });
        dispatch({ type: 'FETCH_GENRE_DETAILS', payload: id });
    }, []);

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      });


    console.log('In details details', details);
    console.log(genresArray);

    return (

        

        <Paper
        sx={{
          p: 2,
          margin: 'auto',
          mt: '30px',
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
            <Typography variant="body1" color="text.primary">
                  Genres:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {genresArray.map(genre => (
                      <p key={genre.id}>{genre.name}</p>
                  ))}
                </Typography>
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
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Remove
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
     
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
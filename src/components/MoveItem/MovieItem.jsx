import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";



function MovieItem({ movie }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (movie) => {
        dispatch({type: 'SET_DETAILS', payload: movie})
        console.log('selected movie is', movie);
        // dispatch({type: 'GET_DETAILS', payload: movie});
        // dispatch({type: 'FETCH_GENRE_DETAILS', payload: movie})
        history.push(`/details/${movie.id}`)
    }
    
    return (

        <Card sx={{ width: 280 }}>
            <CardActionArea onClick={() => handleClick(movie)}>
                <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default MovieItem;
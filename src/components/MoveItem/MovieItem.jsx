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

    const handleClick = () => {
        dispatch({type: 'GET_DETAILS', payload: movie});
        dispatch({type: 'FETCH_GENRE_DETAILS', payload: movie})
        history.push(`/details`)
    }

    return (
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster}
                    alt={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default MovieItem;
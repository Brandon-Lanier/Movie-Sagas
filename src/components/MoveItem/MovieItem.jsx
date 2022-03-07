import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardHeader } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";



function MovieItem({ movie }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = (movie) => {
        // When a movie is clicked, tell reducer to store the selected movie and go to movie page
        dispatch({type: 'SET_DETAILS', payload: movie})
        history.push(`/details/${movie.id}`)
    }
    
    return (

        <Card sx={{ width: 200 }} elevation={5}>
            <CardActionArea onClick={() => handleClick(movie)}>
                <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster}
                    alt={movie.title}
                />
                <CardContent sx={{m: '0', p: '3px', alignContent: 'center'}}>
                    <Typography gutterBottom variant="h6">
                        {movie.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}

export default MovieItem;
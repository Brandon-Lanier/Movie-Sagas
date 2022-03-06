import WatchList from "../WatchList/WatchList";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


function WatchItem({movie}) {

    const dispatch = useDispatch();

    
    const removeWatch = () => {
        console.log(movie.id);
        dispatch({type: 'REMOVE_WATCH', payload: movie.id})
    }

    return (
        <Card sx={{ width: 280, margin: '10px' }} elevation={5}>
              <IconButton
                    aria-label="delete"
                    onClick={removeWatch}
                        >
                    <CloseIcon />
                </IconButton>
            <CardActionArea>
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

export default WatchItem;


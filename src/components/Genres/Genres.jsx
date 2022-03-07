import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MovieItem from "../MoveItem/MovieItem";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import './Genres.css';


function Genres() {

    // This page will display all movies that have match the genre that was clicked on.

    const dispatch = useDispatch();
    const { genre } = useParams();

    useEffect(() => {
        // Run the saga that will fetch movies that match the genre
        dispatch({ type: 'FETCH_MATCH_GENRE', payload: genre });
    }, []);

    const matchedMovies = useSelector(store => store.matchedMovies)
    console.log('Matched Movies', matchedMovies);

    console.log('Matched genres is', matchedMovies);

    return (
        <div>
            <Typography variant="h4" sx={{m: '30px'}}>{genre} Movies:</Typography>
            <div className="match-container">
                {matchedMovies.map(movie => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                    />
                    ))}
            </div>
        </div>
    )
}

export default Genres;
import react from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MoveItem/MovieItem';
import './MovieList.css'
import { Typography } from '@mui/material';
import Grow from '@mui/material/Grow';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    return (
        <main>
            <Typography variant="h3">
            Movie List
            </Typography>
            <section className="movies">
            {movies.map(movie => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                    />
                    
                ))}
            </section>
        </main>

    );
}

export default MovieList;
import react from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MoveItem/MovieItem';
import { Typography } from '@mui/material';
import './MovieList.css'



function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    return (
        <main>
            <Typography variant="h4" sx={{m: '10px'}}>
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
import react from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MoveItem/MovieItem';
import './MovieList.css'
import Grid from '@mui/material/Grid';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    return (
        <main>
            <h1>MovieList</h1>
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
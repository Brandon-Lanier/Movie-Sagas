import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function MovieDetails() {

    const dispatch = useDispatch();
    
    const details = useSelector(store => store.details);
    const genresArray = useSelector(store => store.genreDetails)
    
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_GENRE_DETAILS', payload: id });
    }, []);
   
   
    console.log('In details details', details);
    console.log(genresArray);

    return (

        <div>
            <Link to="/">Go back</Link>
            <p>{details.description}</p>
            <img src={details.poster}/>
            <p>{details.title}</p>
            <ul>
                {genresArray.map((genre, i) => (
                    <li key={i}>
                        {genre.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}


export default MovieDetails;
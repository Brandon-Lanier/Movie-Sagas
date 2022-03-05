import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useEffect from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function MovieDetails() {

    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     dispatch({ type: 'GET_DETAILS', payload: id });
    // }, []);

    const details = useSelector(store => store.details);
    const genresArray = useSelector(store => store.genreDetails)
    
    const { id } = useParams();

   
   
    console.log('In details details', details);
    console.log(genresArray);

    return (

        <div>
            <Link to="/">Go back</Link>
            <p>{details[0].description}</p>
            <img src={details[0].poster}/>
            <p>{details[0].title}</p>
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
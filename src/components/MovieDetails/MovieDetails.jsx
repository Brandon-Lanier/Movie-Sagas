import { useSelector } from 'react-redux';
import useEffect from 'react';

function MovieDetails() {

    const details = useSelector(store => store.details);


    return (

        <div>
            {details}
        </div>
    )
}

export default MovieDetails;
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";


function Genres() {

    const dispatch = useDispatch();
    const { genre } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_MATCH_GENRE', payload: genre });
    }, []);

    const matchedMovies = useSelector(store => store.matchedMovies)

    
return (

    <h1>{genre} Movies:</h1>
)
}

export default Genres;
import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MoveItem/MovieItem';
import WatchItem from '../WatchItem/WatchItem';
import { Typography } from '@mui/material';

function WatchList() {

    const movieList = useSelector(store => store.watchList)
    
    console.log('Watch list is', movieList);
    return (
        <div className="watchlist">
            {movieList.map(movie => (
                    <WatchItem
                        key={movie.id}
                        movie={movie}
                    />
                    
                ))}
            </div>
    )
}

export default WatchList;
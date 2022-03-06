import { useDispatch, useSelector } from 'react-redux';
import MovieItem from '../MoveItem/MovieItem';
import WatchItem from '../WatchItem/WatchItem';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

function WatchList() {

    const movieList = useSelector(store => store.watchList[0])
    
    console.log('Watch list is', movieList);
    return (
        <Box
            sx={{
                width: '100%',
                dispaly: 'flex',
                justifyContent: 'center',
                m: '20px'
            }}>
            {movieList.map(movie => (
                    <WatchItem
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </Box>
    )
}

export default WatchList;
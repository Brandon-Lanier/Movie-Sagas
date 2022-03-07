import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';

function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('FETCH_GENRE_DETAILS', getGenreDetails);
    yield takeEvery('ADD_MOVIE', addMovie);
    yield takeEvery('ADD_WATCHLIST', addToWatchList);
    yield takeEvery('EDIT_MOVIE', editMovie);
    yield takeEvery('FETCH_MATCH_GENRE', fetchMatchGenre)
}

// Request to server to edit a movie
function* editMovie(action) {
    try {
        yield axios.put(`/api/movie/edit/${action.payload.id}`, action.payload.update)
        yield put({type: 'FETCH_MOVIES'})
        yield put({type: 'GET_DETAILS', payload: action.payload.id})
    } catch(error) {
        console.log('Error updating movie', error);
    }
}

// Request to server to get movie data to add to watchlist
function* addToWatchList(action) {
    try {
        const watchAdd = yield axios.get(`/api/movie/${action.payload}`)
        yield put({type: 'SET_WATCHLIST', payload: watchAdd.data[0]})
    } catch(error) {
        console.log('Error Add To Watchlist', error);
        
    }
}

// Request to server to add a movie
function* addMovie(action) {
    console.log('New movie is', action.payload);
    try {
        yield axios.post('/api/movie', action.payload)
        yield put({type: 'FETCH_MOVIES'})
    } catch(error) {
        console.log('Error adding movie', error);
    }
}

// Request to server to get the genres associated with the selected movie
function* getGenreDetails(action) {
    try {
        const genres = yield axios.get(`/api/genre/selected/${action.payload}`)
        yield put({type: 'SET_GENRE_DETAILS', payload: genres.data})
    } catch(error) {
        console.log('Failed to get genre details', error);
    }
}

// Request to server to get details of a selected movie from DB 
function* getDetails(action) {
    try {
        const movie = yield axios.get(`/api/movie/${action.payload}`)
        yield put({type: 'SET_DETAILS', payload: movie.data[0]})
    } catch (error) {
        console.log('Error getting details', error);  
    }
}

// Request to server to get all movies from DB
function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });
    } catch {
        console.log('get all error');
    }
}

function* fetchGenres() {
    //Get all genres from the database
    try {
        const genres = yield axios.get('/api/genre')
        console.log('All genres', genres.data);
        yield put({type: 'SET_GENRES', payload: genres.data})
    } catch (error) {
        console.log('Error fetching genres', error); 
    }
}


// This will find all movies of a specific genre selected by user.
function* fetchMatchGenre(action) {
    try {
        const genreQuery = action.payload
        const matchedMovies = yield axios.get('/api/genre/match', {params: {genre: genreQuery}});
        yield put({type: 'SET_MATCH_GENRES', payload: matchedMovies.data})
    } catch(error) {
        console.log('Error getting matched movies', error);
    }
}

export default rootSaga;
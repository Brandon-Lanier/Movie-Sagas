import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
        contrastText: '#121212'
      }
    },
  });

// Create the rootSaga generator function
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


// Still working on getting this to function.  Server is not taking the query string in/.
function* fetchMatchGenre(action) {
    try {
        console.log('action payload for match is', action.payload);
        const genreQuery = action.payload
        const matchedMovies = yield axios.get('/api/movie/match', {params: {genre: genreQuery}});
        yield put({type: 'SET_MATCH_GENRES', payload: matchedMovies})
    } catch(error) {
        console.log('Error getting matched movies', error);
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const matchedMovies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MATCH_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store movie details for selected movie
const details = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
                return action.payload;
        default: 
            return state;
    }
}

const genreDetails = (state = [], action) => {
    console.log('Inside Reducer for Genres', action.payload );
    switch (action.type){
        case 'SET_GENRE_DETAILS':
            return action.payload
            default: 
                return state;       
    }
}

// Reducer that stores things selected for watchlist and manages removing them.
const watchList = (state = [], action) => {
    console.log('In Watch List', action.payload);
    switch (action.type){
        case "SET_WATCHLIST":
            return [...state, action.payload]
        case "REMOVE_WATCH":
            return state.filter(movie => movie.id != action.payload)
    }
    return state;
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        genreDetails,
        watchList
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <ThemeProvider theme={darkTheme}>
        <App />
        </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

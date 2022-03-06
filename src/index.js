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
    },
  });

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchGenres);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('FETCH_GENRE_DETAILS', getGenreDetails);
    yield takeEvery('ADD_MOVIE', addMovie)
    yield takeEvery('ADD_WATCHLIST', addToWatchList)
}


function* addToWatchList(action) {
    try {
        const watchAdd = yield axios.get(`/api/movie/${action.payload}`)
        yield put({type: 'SET_WATCHLIST', payload: watchAdd.data[0]})
    } catch(error) {
        console.log('Error Add To Watchlist', error);
        
    }
}

function* addMovie(action) {
    console.log('New movie is', action.payload);
    try {
        yield axios.post('/api/movie', action.payload)
        yield put({type: 'FETCH_MOVIES'})
    } catch(error) {
        console.log('Error adding movie', error);
    }
}

function* getGenreDetails(action) {
    console.log('Genre Details getter', action.payload);
    try {
        const genres = yield axios.get(`/api/genre/selected/${action.payload}`)
        yield put({type: 'SET_GENRE_DETAILS', payload: genres.data})
        console.log('Genre from SERVER', genres );
    } catch(error) {
        console.log('Failed to get genre details', error);
        
    }
}

function* getDetails(action) {
    console.log('Payload is', action.payload);
    try {
        const movie = yield axios.get(`/api/movie/${action.payload}`)
        console.log('movie GET FROM server', movie);
        yield put({type: 'SET_DETAILS', payload: movie.data.data})
    } catch (error) {
        console.log('Error getting details', error);  
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
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

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
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
        case 'GET_DETAILS':
            return state
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

// Reducer that stores things selected for watchlist
const watchList = (state = [], action) => {
    console.log('In Watch List', action.payload);
    switch (action.type){
        case "SET_WATCHLIST":
            return [...state, action.payload]
    }
    return state;
}

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

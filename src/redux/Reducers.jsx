import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootSaga from './Sagas';


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
        case 'SET_MATCH_GENRES':
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
        watchList,
        matchedMovies
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
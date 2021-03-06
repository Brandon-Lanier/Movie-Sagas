import {HashRouter as Router, Route, useParams} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import AddMovie from '../AddMovie/AddMovie';
import WatchList from '../WatchList/WatchList';
import Header from '../Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';
import Genres from '../Genres/Genres';

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
    dispatch({ type: 'FETCH_GENRES'})
}, []);

  return (
    <div className="App">
      <Router> 
        <Header />       
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:id">
          <MovieDetails />
        </Route>
        <Route path="/add">
          <AddMovie />
        </Route>
        <Route path="/watchlist">
          <WatchList />
        </Route>
        <Route path="/genres/:genre">
          <Genres />
        </Route>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

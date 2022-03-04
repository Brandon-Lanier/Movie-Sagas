import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails'
import AddMovie from '../AddMovie/AddMovie';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <Router> 
        <Header />       
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details" exact>
          <MovieDetails />
        </Route>
        <Route path="/add">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;

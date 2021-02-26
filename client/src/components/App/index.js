import './style.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Landing from '../../domain/Landing';
import SignUp from '../../domain/Auth/SignUp';
import Login from '../../domain/Auth/Login';
import MovieList from '../../domain/MovieList';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>FZZinemas</h1>
        </header>
        <Route exact path='/' component={Landing} />
        <Switch>
          {/* http://localhost:3000/movies */}
          <Route exact path='/movies' component={ MovieList }/>
          {/* http://localhost:3000/signup */}
          <Route exact path='/signup' component={ SignUp }/>
          {/* http://localhost:3000/login */}
          <Route exact path='/login' component={ Login }/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

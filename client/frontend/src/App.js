import logo from './logo.svg';
import './App.css';
import { Router } from 'express';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = "/">
            <Home />
        </Route>
        <Route  path = "/">
            <Home />
        </Route>
        <Route  path = "/">
            <Home />
        </Route>
        <Route  path = "/">
            <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

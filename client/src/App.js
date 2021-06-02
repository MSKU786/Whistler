
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/messenger/Messenger";
import Setting from "./pages/setting/Setting"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


function App() {
  const loggedIn = localStorage.token ? true : false;

// // Check for token to keep user logged in
//   if (loggedIn) {
//   // Set auth token header auth
//   const token = localStorage.token;
//   setAuthToken(token);

//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   console.log(decoded);
//   // Set user and isAuthenticated

//   // Check for expired token
//   const currentTime = Date.now() / 100; // to get in milliseconds


 //}
  return  (
    <Router>
      <Switch>
        <Route exact path="/">
            {loggedIn ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
            {loggedIn ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route path="/register">
            {!loggedIn ? <Redirect to="/login"/> : <Register  />}
        </Route>
        <Route path="/messenger/:id">
            {!loggedIn ? <Redirect to="/login"/> : <Messenger/>}
        </Route>
        <Route path="/profile/:loggedInname">
            {!loggedIn ? <Redirect to="/login"/> : <Profile />}     
        </Route>
        <Route path="/Setting">
          {!loggedIn ? <Redirect to="/login"/> : <Setting />}     
            
        </Route>
      </Switch>
    </Router>
  )   ;
}

export default App;

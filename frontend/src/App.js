import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Wall from './components/wall';
import SignUp from './components/signup';
import SignUpComplete from './components/signupcomplete';
import Login from './components/login';


function App() {
  return (
    <Router>
      <div className="col-sm-8 mx-auto text-light bg-secondary">
        <Route exact path="/" component={ Wall } />
        <Route exact path="/signup" component={ SignUp } />
        <Route path="/complete" component={ SignUpComplete } />
        <Route path="/login" component={ Login } />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Wall from './components/wall';
import SignUp from './components/signup';


function App() {
  return (
    <Router>
      <div className="col-sm-8 mx-auto text-light bg-secondary">
        <Route exact path="/" component={ Wall } />
        <Route path="/signup" component={ SignUp } />
      </div>
    </Router>
  );
}

export default App;

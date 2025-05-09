import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import AboutUS from './AboutUS';
import DataInsight from './DataInsight';
import Suggestion from './suggestion'; // Import the Suggestion component
import "./index.css";




const App = () => {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/datainsights' component={DataInsight} />
        <Route path='/about-us' component={AboutUS} />
        <Route path='/suggestion' component={Suggestion} /> 
      </Switch>
      </Router>
    </>
  );
};

export default App;

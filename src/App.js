import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Header from "./components/Header";
import Login from './components/Login';
import Signup from "./components/Signup";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route path="/" exact component={Dashboard} />
          <Route path="/users/" component={Dashboard} />
          <Route path="/summary" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;

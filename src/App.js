import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Firebase, { FirebaseContext } from './components/Firebase';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <Router>
        <FirebaseContext.Provider value={new Firebase()}>
          <Navigation />
        </FirebaseContext.Provider>
      </Router>
    );
  }
}

export default App;

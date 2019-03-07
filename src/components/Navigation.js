import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withAuthentication } from './Session';
import Dashboard from "../containers/Dashboard";
import Header from "./Header";
import Login from './Login';
import SignUpForm from "./Signup";

class Navigation extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/users/" component={Dashboard} />
                    <Route path="/summary" component={Dashboard} />
                    <Route path="/signup" component={SignUpForm} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

export default withAuthentication(Navigation);

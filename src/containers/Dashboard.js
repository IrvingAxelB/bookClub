import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

class Dashboard extends Component {
    render(){
        return (
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        );
    }
}

export default Dashboard;
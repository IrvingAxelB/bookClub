import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class Login extends Component {
    state = { ...INITIAL_STATE };
    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    required
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                />
                <TextField
                    required
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <Button variant="contained" type="submit">
                    Login
                </Button>
            </form>
        );
    }
}

export default withRouter(withFirebase(Login));

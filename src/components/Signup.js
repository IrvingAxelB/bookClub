import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withFirebase } from './Firebase';
import {withRouter} from "react-router-dom";

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    password: '',
    errorCode: null,
    errorMessage: null,
};

class SignUpFormBase extends Component {
    state = { ...INITIAL_STATE };
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        const THAT = this;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                    .usersCollection(authUser.user.uid)
                    .set({
                        username,
                        email,
                        profile_image : '',
                    }).then(() => {
                        THAT.setState({ ...INITIAL_STATE });
                        THAT.props.history.push('/');
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    };
    render() {
        const {
            error,
            username,
            email,
            passwordOne,
            passwordTwo,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    required
                    label="User Name"
                    value={this.state.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                />
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
                    value={this.state.passwordOne}
                    onChange={this.handleChange('passwordOne')}
                    margin="normal"
                />
                <TextField
                    required
                    label="Confirm Password"
                    type="password"
                    value={this.state.passwordTwo}
                    onChange={this.handleChange('passwordTwo')}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    type="submit"
                    disabled={isInvalid}
                >
                    Sign Up
                </Button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default withRouter(withFirebase(SignUpFormBase));

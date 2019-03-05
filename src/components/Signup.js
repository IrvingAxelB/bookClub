import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Signup extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        errorCode: '',
        errorMessage: '',
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleSubmit = (e) => {
        console.log('state', this.state);
    };
    createAccount () {
        const { email, password } = this.state;
        // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     this.setState({
        //         errorCode,
        //         errorMessage,
        //     });
        // });
    };
    render() {
        return (
            <form>
                <TextField
                    required
                    label="First Name"
                    value={this.state.name}
                    onChange={this.handleChange('firstNane')}
                    margin="normal"
                />
                <TextField
                    required
                    label="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleChange('lastName')}
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
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    margin="normal"
                />
                <Button variant="contained" onClick={this.handleSubmit}>
                    Sign Up
                </Button>
            </form>
        );
    }
}

export default Signup;

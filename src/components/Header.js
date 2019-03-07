import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { AuthUserContext } from './Session';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export interface Props extends WithStyles<typeof styles> {}

export interface State {
  anchorEl: null | HTMLElement;
}

class MenuAppBar extends React.Component<Props, State> {
  state: State = {
    anchorEl: null,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  displayMenuItems = () => {
    const { history, firebase } = this.props;

    return (
        <AuthUserContext.Consumer>
          {authUser =>
              authUser ? (
                  <div onClick={this.handleClose}>
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    <MenuItem onClick={firebase.doSignOut}>Logout</MenuItem>
                  </div>
              ) : (
              <div onClick={this.handleClose}>
                <MenuItem onClick={() => { history.push('/signup') }}>Sign Up</MenuItem>
                <MenuItem onClick={() => { history.push('/login') }}>Login</MenuItem>
              </div>
            )
          }
        </AuthUserContext.Consumer>
    );
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Photos
            </Typography>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                {this.displayMenuItems()}
              </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withFirebase(withRouter(withStyles(styles)(MenuAppBar)));

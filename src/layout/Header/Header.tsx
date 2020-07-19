import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Container, Hidden } from '@material-ui/core';

// styles
import classes from './Header.module.scss';
// assets
import logoDesktop from './assets/logo-desktop.png'
import logoMobile from './assets/logo-mobile.png'


// export default function Header() {
const Header: React.FC = () => {
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container style={{padding: '0'}}>
          <Toolbar>
            <div className={classes.logo}>
              <Hidden smUp={true}>
                <img src={logoMobile} alt="logo" style={{height: '100%'}}/>
              </Hidden>
              <Hidden only="xs">
                <img src={logoDesktop} alt="logo" style={{height: '100%'}}/>
              </Hidden>
            </div>

            <Link to="/" className={classes.link}>
              <Button color="inherit">Board</Button>
            </Link>
            <Link to="/new" className={classes.link}>
              <Button color="inherit">New</Button>
            </Link>

          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Container } from '@material-ui/core';

import Header from './layout/Header';
import Dashboard from './pages/Dashboard';
import PostNewTheft from './pages/PostNewTheft';
import PageNotFound from './pages/PageNotFound';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header/>

      <Container>
        <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/new' component={PostNewTheft}/>
          <Route path="/404" component={PageNotFound}/>
          <Redirect to="/404"/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
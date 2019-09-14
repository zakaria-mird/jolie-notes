import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StoreProvider } from './store/store';
import * as serviceWorker from './serviceWorker';
import App from './views/App';
import Login from './views/Login';
import Notes from './views/Notes';
import Add from './views/Add';
import PrivateRoute from './components/PrivateRoute';

ReactDOM.render(
  <StoreProvider>
    <Router> 
      <App> 
        <Route path={["/", "/login"]} component={Login} />
        <PrivateRoute path="/notes" component={Notes} />
        <PrivateRoute path="/add" component={Add} />
      </App>
    </Router>
  </StoreProvider>
  , document.getElementById('root'));

serviceWorker.register();

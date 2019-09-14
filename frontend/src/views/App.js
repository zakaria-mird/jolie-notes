import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom';
import { Store } from '../store/store';
import "./App.css";

class App extends React.Component {
  static contextType = Store;
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(App);

import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import AuthContext from "../contexts/AuthContext.js";
import LoginForm from "../components/LoginForm.js";
import "./Login.css";

// console.log(AuthContext);

class Login extends React.Component {
  static contextType = AuthContext
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    const authentication = this.props.context;
    console.log(this.context);
    // if (this.context.isAuthenticated) {
    //   this.props.history.push("/notes");
    // }
  }

  render() {
    return (
      <div id="login">
        <div className="form-wrapper">
          <LoginForm />
        </div>
      </div>
    );
  }
}

// Login.contextType = AuthContext;

export default withRouter(Login);

import React from "react";
import { Redirect, withRouter } from "react-router";
import { Store } from "../store/store.js";
import LoginForm from "../components/LoginForm.js";
import "./Login.css";

class Login extends React.Component {
  static contextType = Store;

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/notes" } };
    if(this.context.state.isAuthenticated) return <Redirect to={from} />
    return (
      <div id="login">
        <div className="form-wrapper">
          <LoginForm history={this.props.history}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

import React from "react";
import AuthContext from "../contexts/AuthContext.js";
import "./LoginForm.css";

class LoginForm extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.username !== "" && this.state.password !== "") {
      this.context.authenticate(this.state.username, this.state.password);
    }
    event.preventDefault();
  }

  render() {
    return (
      <form id="login-form" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <div className="login-field">
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
            placeholder="Username"
          />
        </div>
        <div className="login-field">
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
            placeholder="Password"
          />
        </div>
        <button className="login-button" type="submit">
          Conferma
        </button>
      </form>
    );
  }
}

export default LoginForm;

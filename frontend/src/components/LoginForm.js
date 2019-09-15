import React from "react";
import { Store } from "../store/store.js";
import { authenticate } from "../store/actions";
import "./LoginForm.css";

export default function LoginForm() {
  const { dispatch } = React.useContext(Store);
  let [ state, setState ] = React.useState({
    username: "",
    password: ""
  });

  const handleUsernameChange = event => setState({ ...state, username: event.target.value });
  const handlePasswordChange = event => setState({ ...state, password: event.target.value });
  const handleSubmit = event => {
    if (state.username !== "" && state.password !== "") {
      authenticate(state.username, state.password, dispatch);
    }
    event.preventDefault();
  }

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="login-field">
        <input
          type="text"
          value={state.username}
          onChange={handleUsernameChange}
          placeholder="Username"
        />
      </div>
      <div className="login-field">
        <input
          type="password"
          value={state.password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
      </div>
      <button className="login-button" type="submit">
        Conferma
        </button>
    </form>
  );
}
import React from "react";
import { Store } from "../store/store.js";
import { authenticate } from "../store/actions";
import "./LoginForm.css";

function LoginForm() {
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
// class LoginForm extends React.Component {
//   static contextType = Store;
//   static props = {
//     isAuthenticated: this.context.isAuthenticated
//   }

//   constructor(props) {
//     super(props);

//     this.state = {
//       username: "",
//       password: ""
//     };

//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleUsernameChange(event) {
//     this.setState({ username: event.target.value });
//   }

//   handlePasswordChange(event) {
//     this.setState({ password: event.target.value });
//   }

//   handleSubmit(event) {
//     if (this.state.username !== "" && this.state.password !== "") {
//       authenticate(this.state.username, this.state.password, this.context.dispatch);
//     }
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form id="login-form" onSubmit={this.handleSubmit}>
//         <h2>Login</h2>
//         <div className="login-field">
//           <input
//             type="text"
//             value={this.state.username}
//             onChange={this.handleUsernameChange.bind(this)}
//             placeholder="Username"
//           />
//         </div>
//         <div className="login-field">
//           <input
//             type="password"
//             value={this.state.password}
//             onChange={this.handlePasswordChange.bind(this)}
//             placeholder="Password"
//           />
//         </div>
//         <button className="login-button" type="submit">
//           Conferma
//         </button>
//       </form>
//     );
//   }
// }

export default LoginForm;

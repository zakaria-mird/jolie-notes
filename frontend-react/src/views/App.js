import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.js";
import "./App.css";
import Login from "./Login.js";
import Add from "./Add.js";
import Notes from "./Notes";


function PrivateRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.isAuthenticated ? (
              <Component {...props} />
            ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
          }
        />
      )}
    </AuthContext.Consumer>
  );
}

class App extends React.Component {
  static state = {
    isAuthenticated: false,
    token: "",
    authenticate: (username, password) => {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      fetch("http://localhost:8001/login", {
        method: "POST",
        body: formData
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          let parser = new DOMParser();
          let documentData = parser.parseFromString(data, "text/xml");
          let token = documentData.getElementsByTagName("token").textContent;
          this.setState(state => {
            return {
              isAuthenticated: true,
              token: token
            };
          });
          // this.props.history.push("/notes");
        });
    }
  };

  componentDidMount() {
    (this).setState(state => {
      return {
        isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated"))
      };
    })
  }

  componentDidUpdate(prevState) {
    if (this.state.isAuthenticated !== prevState.isAuthenticated) {
      localStorage.setItem("isAuthenticated", this.state.isAuthenticated);
    }
  }

  render() {
    return (
      <div id="app">
        <AuthContext.Provider value={this.state}>
          <Router>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/add" component={Add} />
            <PrivateRoute path="/notes" component={Notes} />
          </Router>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;

import React from "react";

const AuthContext = React.createContext({
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
});

export default AuthContext;


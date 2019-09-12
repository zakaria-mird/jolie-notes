import React from "react";

class Note extends React.Component {
  render() {
    return (
      <div className="note">
        <div className="title"></div>
        <div className="delete">✖</div>
        <div className="content"></div>
      </div>
    );
  }
}

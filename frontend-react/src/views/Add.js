import React from "react";
import './Add.css';

class Add extends React.Component {
  render() {
    return (
      <div id="add-note">
        <textarea
          name=""
          id="text-input"
          placeholder="Insert text here..."
        ></textarea>
        <div className="bottom-bar">
          <button className="button cancel">Annulla</button>
          <button className="button confirm">Conferma</button>
        </div>
      </div>
    );
  }
}

export default Add;

import React from "react";
import './Notes.css';

class Notes extends React.Component {
  render() {
    return (
      <div id="notes">
        <div class="notes-wrapper">
          <h1>Notes</h1>
          <hr />
          <div class="add">
            <span>Aggiungi</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;

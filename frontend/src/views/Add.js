import React from "react";
import { Store } from '../store/store';
import { addNote } from '../store/actions';
import './Add.css';

function Add(props) {
  const context = React.useContext(Store);
  const [state, setState] = React.useState({
    title: "",
    content: ""
  });

  const handleTitleChange = event => setState({ ...state, title: event.target.value });
  const handleContentChange = event => setState({ ...state, content: event.target.value });
  const handleSubmit = event => {
    if (state.title !== "" && state.content !== "") {
      addNote(context.state.token, state.title, state.content, context.dispatch);
    }
    props.history.push("/notes");
  }

  return (
    <div id="add-note">
      <input
        id="title-input" 
        value={state.title} 
        onChange={handleTitleChange} 
        name="title" 
        placeholder="Insert title here..." />
      <textarea
        name=""
        value={state.content}
        onChange={handleContentChange}
        id="text-input"
        placeholder="Insert text here..."
      ></textarea>
      <div className="bottom-bar">
        <button className="button cancel" onClick={() => {props.history.push("/notes");}}>Annulla</button>
        <button className="button confirm" onClick={handleSubmit}>Conferma</button>
      </div>
    </div>
  );
}

export default Add;

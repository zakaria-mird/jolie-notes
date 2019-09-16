import React from "react";
import { Store } from '../store/store';
import { getNotes, deleteNote } from '../store/actions';
import Note from '../components/Note';
import './Notes.css';

export default function Notes(props) {
  const context = React.useContext(Store);
  const [state, setState] = React.useState({
    notes: []
  });

  React.useEffect(() => {
    let notes = getNotes(context.state.token, context.dispatch);
    setState({
      ...state,
      notes: notes,
    });
  }, [context.state.token, context.dispatch]);

  const addNode = event => {
    event.preventDefault();
    props.history.push("/add");
  }

  const handleDeleteNote = (id) => {
    deleteNote(context.state.token, id, context.dispatch);
    setTimeout(() => {
      getNotes(context.state.token, context.dispatch);
      setState({
        ...state,
        notes: context.state.notes,
      });
    }, 250);
  }

  return (
    <div id="notes">
      <div className="notes-wrapper">
        <h1>Notes</h1>
        <hr />
        <div className="add" onClick={addNode}>
          <span>Aggiungi</span>
        </div>
        {context.state.notes.map((note) => {
          return <Note key={note.id}
            handleDeleteNote={handleDeleteNote}
            id={note.id}
            title={note.title}
            content={note.content} />
        })}
      </div>
    </div>
  );
}
import React from "react";
import './Note.css';

export default function Note(props) {

  return (
    <div className="note">
      <div className="title">{props.title}</div>
      <div className="delete" onClick={() => props.handleDeleteNote(props.id)}>✖</div>
      <div className="content">{props.content}</div>
    </div>
  );
}
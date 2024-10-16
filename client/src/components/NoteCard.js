import React from 'react';
import './NoteCard.css';

function NoteCard({ title, date, content, tags, onClick, onclickdelete, onclickpin, pinned }) {
  const handleDeleteClick = (e) => {
    // Prevent the click event from propagating to the parent
    e.stopPropagation(); 
    // Call the delete function
    onclickdelete(); 
  };

  const handlepinClick = (e) => {
    e.stopPropagation(); 
    onclickpin(); 
  };

  return (
    <div className="note-card" onClick={onClick}>
      <div className="note-card-header">
        <h3 className="note-title">{title}</h3>
        {/* Pin Icon */}
        <i 
          className={`fi fi-rr-thumbtack note-pin ${pinned ? 'pinned' : ''}`} 
          onClick={handlepinClick}
        ></i> 
      </div>
      <p className="note-date">{date}</p>
      <div className="note-content">{content}</div>
      <div className="note-footer">
        <p className="note-tags">
          {tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </p>
        <div className="note-actions">
          <i className="fi fi-rr-trash note-delete" onClick={handleDeleteClick}></i> {/* Delete Icon */}
        </div>
      </div>
    </div>
  );
}

export default NoteCard;





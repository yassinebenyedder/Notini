import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Notemodal.css';
import Axios from 'axios';
import { useCookies } from 'react-cookie';

function NoteModal({ isOpen, closeModal, selectedNote }) {
  const [tags, setTags] = useState([]); 
  const [newTag, setNewTag] = useState(''); 
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [cookies] = useCookies(['access_token']);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content); 
      setTags(selectedNote.tags);
    } else {
      // Reset the fields if no note is selected
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [selectedNote]);

  // Function to handle adding a new tag
  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.length >10) {
      setErrorMessage("max tag length exceeded")
    }
    else if (newTag.trim() !== '' && tags.length < 3) {
      setTags([...tags, newTag]); 
      setNewTag('');
    } 
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setNewTag(e.target.value); 
  };

  // Function to handle removing a tag
  const handleRemoveTag = (indexToRemove) => {
    // Remove the tag at the given index
    setTags(tags.filter((_, index) => index !== indexToRemove)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = cookies.access_token;
      const userID = window.localStorage.getItem('userID');
      //change the api link depend if the user will update or create a note 
      const endpoint = selectedNote ? `${process.env.REACT_APP_API_BASE_URL}/notes/update/${selectedNote._id}` : `${process.env.REACT_APP_API_BASE_URL}/notes/createnote`; 

      if (title.length > 25) {
        setErrorMessage("max title length exceeded")
        return;
      } else if (!content) { 
          setErrorMessage("content are required")
      }


      const res = await Axios[selectedNote ? 'patch' : 'post'](endpoint, {
        title: title ? title : "Untitled" ,
        content: content,
        userID: userID,
        tags: tags,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If response is successful and status is 200 (update) or 201 (create)
      if (res.status === 200 || res.status === 201) {
        console.log('Note saved successfully added');
        setTags([]);
        setTitle('');
        setContent('');
        setNewTag('');
        setErrorMessage('');
        closeModal();
      } else if (res.status === 500) {
        console.log('failed creating note');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Add Note"
      className="modal"
      overlayClassName="overlay"
    >
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-title"
        />
        <textarea
          rows={3}
          placeholder="Write your note here..."
          autoFocus
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="form-control fixed-textarea"
        />

        {/* Tags Section */}
        <div className='tags'>
          {/* Map over the tags array and display each tag */}
          {tags.map((tag, index) => (
            <span key={index} className="tag-item">
              {tag}
              <button className="remove-tag-button" type='button' onClick={() => handleRemoveTag(index)}>x</button>
            </span>
          ))}
        </div>
      
        <div className='tags-container'>
          <input
            type="text"
            placeholder="Add tags"
            className="tags-area"
            value={newTag}
            onChange={handleInputChange}
        
          />
          <button type="button" className="submit-button" onClick={handleAddTag}>
            Add tag
          </button>
        </div>
         {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" className="submit-button">
          Save Note
        </button>
        <button onClick={closeModal} className="close-button">
          Close
        </button>
      </form>
    </Modal>
  );
}

export default NoteModal;

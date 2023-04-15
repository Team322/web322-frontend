import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const JSONModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [jsonString, setJsonString] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const json = JSON.parse(jsonString);
      onSubmit(json);
    } catch (err) {
      console.log('Error parsing JSON:', err);
    }
  };

  const handleChange = (e) => {
    setJsonString(e.target.value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="JSON Modal"
    >
      <form onSubmit={handleSubmit}>
        <label>
          JSON:
          <textarea value={jsonString} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default JSONModal;

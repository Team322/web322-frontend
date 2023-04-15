import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const JSONModal = ({ isOpen, onRequestClose, onSubmit, defaultJSON }) => {
  const [jsonString, setJsonString] = useState(defaultJSON);

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
      <form onSubmit={handleSubmit} style={{height: "80%"}}>
        <label className="h-fit">
          Enter JSON parameters to pass to the Web2 service:
          <textarea className="w-full border-slate-600 bg-gray-100 resize-none h-full" value={jsonString} onChange={handleChange} />
        </label>
        <div className="h-3" />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        <div className="h-2" />
        <button onClick={onRequestClose} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
      </form>
    </Modal>
  );
};

export default JSONModal;

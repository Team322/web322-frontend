import React, { useState } from 'react';

function UrlInput({ onUpdate, placeholder }) {
  const [url, setUrl] = useState('');

  function handleBlur(event) {
    let inputValue = event.target.value;

    // Add https:// if missing
    if (!/^https?:\/\//i.test(inputValue)) {
      inputValue = `https://${inputValue}`;
    }

    // Regular expression pattern for a valid URL
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;

    // Validate the input against the pattern
    if (pattern.test(inputValue)) {
      setUrl(inputValue);
    } else {
      setUrl('');
    }
    onUpdate(inputValue);
  }

  return (
    <div className="rounded-l-md py-2 px-4 block w-full sm:text-sm sm:leading-5">
      <input className="w-full bg-gray-200" type="text" value={url} onBlur={handleBlur} onChange={event => setUrl(event.target.value)} placeholder={placeholder} />
    </div>
  );
}

export default UrlInput;

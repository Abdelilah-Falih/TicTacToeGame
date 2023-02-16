import React, { useState } from 'react';
import axios from 'axios';

const ChatGpt = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('https://api.openai.com/v1/engines/text-davinci-002/jobs', {
        prompt: input,
        max_tokens: 100,
        temperature: 0.5,
      }, {
        headers: {
          'Authorization': `Bearer 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`
        }
      })
      .then(res => {
        setResponse(res.data.choices[0].text);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input">Input:</label>
          <input
            type="text"
            className="form-control"
            id="input"
            value={input}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default ChatGpt;


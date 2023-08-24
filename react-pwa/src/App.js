import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [commonNgrams, setCommonNgrams] = useState([]);

  const handleSubmit = async () => {
    if (inputText) {
      try {
        const response = await fetch('http://localhost:8000/submit-text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
        });

        if (response.ok) {
          setMessage('Text submitted successfully');
          setInputText('');
          fetchCommonNgrams();  // Fetch common ngrams after successful submission
        } else {
          setMessage('Error submitting text');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error submitting text');
      }
    }
  };

  const fetchCommonNgrams = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/compare-ngrams/');
      const data = await response.json();
      setCommonNgrams(data.common_ngrams);
    } catch (error) {
      console.error('Error fetching common ngrams:', error);
    }
  };

  useEffect(() => {
    fetchCommonNgrams();  // Fetch common ngrams on initial load
  }, []);

  return (
    <div className="App">
      <div className='head'>
          <h1>My PWA Project</h1>
      </div>
    <div className="content">
        <label>Enter your message:</label>
        <br/>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        /> <br/>
        <button onClick={handleSubmit}>Submit</button>
        <p>{message}</p>
        <ul>
          {commonNgrams.map((ngram, index) => (
            <li key={index}>{ngram.join(' ')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;





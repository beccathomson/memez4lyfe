import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [memeUrl, setMemeUrl] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);


  useEffect(() => {
    fetch('/meme?caption=\'input sample caption\'').then(res => res.json()).then(data => setMemeUrl(data.input_caption));
  }, []);

  return (
    <div className="Memez4Lyfe">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <p>The current time is {currentTime}.</p>
          <p>The meme url is {memeUrl}.</p>
      </header>
    </div>
  );
}

export default App;
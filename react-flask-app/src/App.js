import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [memeUrl, setMemeUrl] = useState(0);

  useEffect(() => {
    fetch("/meme?caption='input sample caption'")
      .then((res) => res.json())
      .then((data) => setMemeUrl(data.meme_url));
  }, []);

  return (
    <div className="Memez4Lyfe">
      <header className="App-header">
        <p>The meme url is {memeUrl}.</p>
      </header>
      <Game />
    </div>
  );
}

export default App;

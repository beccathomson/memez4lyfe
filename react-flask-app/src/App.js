import React, { useState, useEffect } from "react";
import "./App.css";
import Captions from "./Captions";

function App() {
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
      <Captions />
    </div>
  );
}

export default App;

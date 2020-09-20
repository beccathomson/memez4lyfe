import React, { useState } from "react";
import "./DisplayMeme.css";
import Captions from "./Captions";

function DisplayMeme(props){
  const caption = 'Sad boy hour'
  const url = props.url

  return(
    <div>
      <img className='displayImg' src={url}></img>
      <p className='displayCaption'>{caption}</p>
      <button className='newCaption'>TRY ANOTHER CAPTION</button>
    </div>
  )
}

export default DisplayMeme;

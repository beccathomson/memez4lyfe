import React from "react";
import "./DisplayMeme.css";

function DisplayMeme(props){

  return(
    <div>
    <img className='displayImg' src={props.url}></img>
        {props.captions.map((caption,index)=>{
        return(<p key={index} className='displayCaption'>{index+1}. {caption}</p>)
    })}
    </div>
  )
}

export default DisplayMeme;

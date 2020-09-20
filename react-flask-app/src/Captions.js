import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RemoveIcon from "@material-ui/icons/Remove";
import DisplayMeme from "./DisplayMeme";

function Captions() {
  const [inputList, setInputList] = useState(["", ""]);
  const [showResult, setShowResult] = useState(false);
  const [memeUrl, setMemeUrl] = useState(0);

  useEffect(() => {
    fetch("/meme?caption='input sample caption'&num_captions=2")
      .then((res) => res.json())
      .then((data) => setMemeUrl(data.meme_url));
  }, []);

  const handleSubmit = (event) => {
    setShowResult(true);
    event.preventDefault();
  };

  // handle input change
  const handleInputChange = (e, index) => {
    var list = [...inputList];
    list[index] = e.target.value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = () => {
    var list = [...inputList];
    let last = list.pop();
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    var list = [...inputList];
    list.push("");
    setInputList(list);
  };

  return (
    <div className="Captions">
      <form onSubmit={handleSubmit}>
        {inputList.map((x, i) => {
          return (
            <div className="captionSection">
              {
                <TextField
                  id="textbox"
                  label="Caption"
                  variant="outlined"
                  key={i}
                  onChange={(e) => handleInputChange(e, i)}
                />
              }
            </div>
          );
        })}
        <div className="btn-box">
          {inputList.length < 5 && (
            <IconButton onClick={() => handleAddClick()}>
              <AddBoxIcon />
            </IconButton>
          )}
          {inputList.length > 2 && (
            <IconButton onClick={() => handleRemoveClick()}>
              <RemoveIcon />
            </IconButton>
          )}
        </div>
        <Button id="submit" variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      <div className="Results">
        {showResult && (
          <p>
            <DisplayMeme url={memeUrl}/>
          </p>
        )}
      </div>
    </div>
  );
}

export default Captions;

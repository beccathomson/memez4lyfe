import React, { useState } from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import RemoveIcon from "@material-ui/icons/Remove";

function Captions() {
  const [inputList, setInputList] = useState([{}]);

  // handleChange(event) {
  //   if (!Object.keys(this.state.captions).includes(event.target.name)) {
  //     delete this.state.captions[event.target.name];
  //   }
  //   let newCaptions = Object.assign({}, this.state.captions);
  //   newCaptions[event.target.name] = event.target.value;
  //   this.setState({ captions: newCaptions });
  // }

  const handleSubmit = (event) => {
    alert(
      "Submitted captions were: " +
        Object.keys(this.state.captions) +
        "\n" +
        Object.values(this.state.captions)
    );
    event.preventDefault();
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const list = [...inputList];
    list[index] = e.target.value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = (index) => {
    const list = [...inputList];
    list[index] = "";
    setInputList(list);
  };

  return (
    <div className="Game">
      {inputList.map((x, i) => {
        return (
          <form onSubmit={handleSubmit}>
            {
              <TextField
                id="textbox"
                name={i}
                label="Caption"
                variant="outlined"
                onChange={(e) => handleInputChange(e, i)}
              />
            }
            <div className="btn-box">
              {inputList.length !== 1 && (
                <IconButton onClick={() => handleRemoveClick(i)}>
                  <RemoveIcon />
                </IconButton>
              )}
              {
                <IconButton onClick={() => handleAddClick(i)}>
                  <AddBoxIcon />
                </IconButton>
              }
            </div>
            <Button
              id="submit"
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default Captions;

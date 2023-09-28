import React, { useRef, useState, useContext } from "react";
import { Box, TextField, ClickAwayListener, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 600px;
  box-shadow: 0 1px 2px 0 rgb(60 64 67/ 30%), 0 2px 6px 2px rgb(60 64 67/ 15%);
  padding: 10px 15px;
  border-radius: 8px;
  border-color: #e0e0e0;
  @media (min-width: 1240px) {
    margin: 0 420px;
  }
  min-height: 30px;
`;

const Note = {
  id: "",
  heading: "",
  text: "",
  noteColor: "",
  reminderDate: "",
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...Note, id: uuid() });
  const [showCloseButton, setShowCloseButton] = useState(false);

  const { setNotes } = useContext(DataContext);

  const containerRef = useRef();

  const onTextAreaClick = () => {
    setShowTextField(true);
    setShowCloseButton(true);
    containerRef.current.style.minHeight = " 100px";
  };

  const handleClickAway = () => {
    setShowTextField(false);
    setShowCloseButton(false);
    containerRef.current.style.minHeight = " 30px";
    setAddNote({ ...Note, id: uuid() });
    if (addNote.heading || addNote.text) {
      setNotes((prevArr) => [addNote, ...prevArr]);
    }
  };

  const handleCloseButtonClick = () => {
    setShowCloseButton(false);
    setShowTextField(false);
    containerRef.current.style.minHeight = " 30px";
    setAddNote({ ...Note, id: uuid() });
    if (addNote.heading || addNote.text) {
      setNotes((prevArr) => [addNote, ...prevArr]);
    }
  };

  const onTextChange = (e) => {
    let ChangedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(ChangedNote);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {showTextField && (
          <TextField
            placeholder="Title"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            style={{ marginBottom: 10 }}
            onChange={(e) => onTextChange(e)}
            name="heading"
            value={addNote.heading}
          />
        )}
        <TextField
          placeholder="Take a note..."
          multiline
          maxRows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          onChange={(e) => onTextChange(e)}
          name="text"
          value={addNote.text}
        />
        {showCloseButton && (
          <Button
            variant="text"
            size="small"
            style={{
              color: "grey",
              marginLeft: "505px",
              textTransform: "none",
            }}
            onClick={handleCloseButtonClick}
          >
            Close
          </Button>
        )}
      </Container>
    </ClickAwayListener>
  );
};

export default Form;

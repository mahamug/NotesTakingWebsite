import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";

const EditNoteModal = ({ openModal, onClose, onSave, note }) => {
  const { setEditedNote } = useContext(DataContext);
  const [addEditedNote, setAddEditedNote] = useState({
    heading: note.heading,
    text: note.text,
  });
  useEffect(() => {
    setAddEditedNote({
      heading: note.heading,
      text: note.text,
    });
  }, [note]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddEditedNote({
      ...addEditedNote,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(addEditedNote);
    setEditedNote((prevArr) => {
      if (Array.isArray(prevArr)) {
        return [addEditedNote, ...prevArr];
      } else {
        return [addEditedNote];
      }
    });
  };

  return (
    <Dialog open={openModal} onClose={onClose} maxWidth="md">
      <DialogTitle>Edit Note</DialogTitle>
      <DialogContent
        dividers
        sx={{
          backgroundColor: note.noteColor,
        }}
      >
        <TextField
          label="Heading"
          name="heading"
          value={addEditedNote.heading}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Text"
          name="text"
          value={addEditedNote.text}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNoteModal;

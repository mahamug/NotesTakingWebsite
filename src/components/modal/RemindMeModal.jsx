import React, { useState, useEffect, useContext} from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { DataContext } from "../../context/DataProvider";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const RemindMeModal = ({openModal, setOpenModal,note}) => {
  const { notes, setNotes,} =  useContext(DataContext);
  const [selectedDate, setSelectedDate, ] = useState( JSON.parse(localStorage.getItem("selectedDate")) || "");

  const handleSetReminder = (note) => {
    note.reminderDate = selectedDate;
    const updatedNotes = notes.map((data) =>
    data.id === note.id ? { ...data, reminderDate: selectedDate} : data
  );
   socket.emit("setReminder", { note, selectedDate });
  setNotes(updatedNotes);
    setOpenModal(null);
  };
  const handleCloseModal = () => {
    setOpenModal(null);
  };

  useEffect(() => {
    localStorage.setItem("selectedDate", JSON.stringify(selectedDate));
  }, [selectedDate]);
  return (
    <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md">
    <DialogTitle>
    <Typography variant="h5" fontWeight="bold">Select Date and Time</Typography>
    </DialogTitle>
    <DialogContent>
    <input style={{marginLeft:20}}
        type="datetime-local"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal} color="primary">
        Close
      </Button>
      <Button onClick={() => handleSetReminder(note)}
       color="primary">
          Save
        </Button>
    </DialogActions>
  </Dialog>
  )
}

export default RemindMeModal
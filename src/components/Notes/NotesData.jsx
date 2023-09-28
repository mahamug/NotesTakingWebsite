import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  ColorLensOutlined as BackgroundOption,
  AddAlertOutlined as ReminderAlert,
  AccessTimeOutlined as AccessTime,
} from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";
import BackgroundColorModal from "../modal/BackgroundColorModal";
import EditNoteModal from "../modal/editNoteModal";
import RemindMeModal from "../modal/RemindMeModal";

const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: ${(props) => props.selectedColor || "initial"};
`;

const NotesData = ({ note }) => {
  const {
    notes,
    setNotes,
    setArchiveNotes,
    setDeletedNotes,
    editedNote,
    setEditedNote,
  } = useContext(DataContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    JSON.parse(localStorage.getItem("notesColor")) || ""
  );

  const archiveNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setArchiveNotes((prevArr) => [note, ...prevArr]);
  };

  const deleteNote = (note) => {
    const updatedNotes = notes.filter((data) => data.id !== note.id);
    setNotes(updatedNotes);
    setDeletedNotes((prevArr) => [note, ...prevArr]);
  };

  const handleBackgroundOptionClick = () => {
    setOpenModal("background");
  };

  const handleReminderModal = () => {
    setOpenModal("reminder");
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const updatedNotes = notes.map((data) =>
      data.id === note.id ? { ...data, noteColor: color } : data
    );
    setNotes(updatedNotes);
  };

  const handleEditOpenModal = () => {
    setOpenModal("edit");
  };

  const onSave = (editedNoteData) => {
    const updatedNote = { ...note, ...editedNoteData };
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((data) =>
        data.id === note.id ? updatedNote : data
      );
      return updatedNotes;
    });

    setEditedNote([]);
    setOpenModal({ type: "edit", data: updatedNote });
    setOpenModal(null);
  };

  useEffect(() => {
    localStorage.setItem("notesColor", JSON.stringify(selectedColor));
  }, [selectedColor]);
  return (
    <StyledCard selectedColor={note.noteColor}>
      <CardContent onClick={handleEditOpenModal}>
        <Typography variant="h5" fontWeight="bold">
          {note.heading}
        </Typography>
        <Typography
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {note.text}
        </Typography>
        {note.reminderDate && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <AccessTime fontSize="small" />
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ margin: 2 }}
            >
              {note.reminderDate}
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Tooltip title="Remind me">
          <ReminderAlert fontSize="small" onClick={handleReminderModal} />
        </Tooltip>
        <Tooltip title="Background Options">
          <BackgroundOption
            fontSize="small"
            onClick={handleBackgroundOptionClick}
          />
        </Tooltip>
        <Tooltip title="Archive">
          <Archive
            fontSize="small"
            style={{ marginLeft: "auto" }}
            onClick={() => archiveNote(note)}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Delete fontSize="small" onClick={() => deleteNote(note)} />
        </Tooltip>
      </CardActions>

      <BackgroundColorModal
        openModal={openModal === "background"}
        setOpenModal={setOpenModal}
        onColorSelect={handleColorSelect}
      />
      <EditNoteModal
        openModal={openModal === "edit"}
        setOpenModal={setOpenModal}
        onClose={() => setOpenModal(null)}
        onSave={onSave}
        note={note}
        noteColor={note.noteColor}
      />
      <RemindMeModal
        openModal={openModal === "reminder"}
        setOpenModal={setOpenModal}
        note={note}
      />
    </StyledCard>
  );
};

export default NotesData;

import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  UnarchiveOutlined as Unarchive,
  DeleteOutlineOutlined as Delete,
} from "@mui/icons-material";
import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
  width: 240px;
  margin: 8px;
  box-shadow: none;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const Archive = ({ note }) => {
  const { setNotes, archiveNotes, setArchiveNotes, setDeletedNotes } =
    useContext(DataContext);

  const UnarchiveNote = (note) => {
    const updatedNotes = archiveNotes.filter((data) => data.id !== note.id); 
    setArchiveNotes(updatedNotes);
    setNotes((prevArr) => [note, ...prevArr]); 
  };

  const deleteNote = (note) => {
    const updatedNotes = archiveNotes.filter((data) => data.id !== note.id); 
    setArchiveNotes(updatedNotes);
    setDeletedNotes((prevArr) => [note, ...prevArr]); 
  };

  return (
    <StyledCard style={{ backgroundColor: note.noteColor }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {note.heading}
        </Typography>
        <Typography>{note.text}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title="Unarchive">
          <Unarchive
            fontSize="small"
            style={{ marginLeft: "auto" }}
            onClick={() => UnarchiveNote(note)} 
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Delete fontSize="small" onClick={() => deleteNote(note)} />
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
};

export default Archive;

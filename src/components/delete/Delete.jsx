import React,{useContext} from "react";
import { Card, CardActions, CardContent, Typography,  Tooltip} from "@mui/material";
import { styled } from "@mui/material/styles";
import {RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as DeleteIcon} from '@mui/icons-material';
import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
width:240px;
margin:8px;
box-shadow:none;
border: 1px solid #e0e0e0;
border-radius:8px;
`;

const Delete = ({ note }) => {
  const { notes, setNotes, setDeletedNotes,deletedNotes} = useContext(DataContext);

  const restoreNote = (note) =>{
    const updatedNotes = deletedNotes.filter(data  => data.id !== note.id);//filter return array so set mae directly push
    setDeletedNotes(updatedNotes);
    setNotes(prevArr => [note, ...prevArr]);// archive to the beginning of the archiveNotes array.
  };
  
  const deleteNote = (note) =>{
    const updatedNotes = deletedNotes.filter(data  => data.id !== note.id);//filter return array so set mae directly push
    setDeletedNotes(updatedNotes);
  };
  
  return (
    <StyledCard style={{ backgroundColor: note.noteColor }}>
      <CardContent>
        <Typography  variant="h5" fontWeight="bold">{note.heading}</Typography>
        <Typography>{note.text}</Typography>
      </CardContent>
      <CardActions>
      <Tooltip title="Delete">
      < DeleteIcon fontSize="medium"
        onClick={() => deleteNote(note)}
        style={{marginLeft:"auto"}}
        />
        </Tooltip>
        <Tooltip title="Restore">
        <Restore
         fontSize="medium"
        onClick={() => restoreNote(note)}// konse note pr click 
        />
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
};

export default Delete;

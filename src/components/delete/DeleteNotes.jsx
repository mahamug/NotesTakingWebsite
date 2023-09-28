import React, { useContext } from "react";
import { Box,Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
//components

import { DataContext } from "../../context/DataProvider";
import Delete from "./Delete";

const DrawerHeader = styled("div")(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DeletedNotes = () => {
  const { deletedNotes } = useContext(DataContext);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container style={{marginTop:28}}>
        {
        deletedNotes.map((note) => (
          <Grid item>
            <Delete note={note}/>
          </Grid>
        ))}
        </Grid> 
      </Box>
    </Box>
  );
};

export default DeletedNotes;

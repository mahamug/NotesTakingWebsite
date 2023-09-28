import React, { useContext } from "react";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
//components
import Archive from "./Archive";
import { DataContext } from "../../context/DataProvider";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const ArchiveNotes = () => {
  const { archiveNotes } = useContext(DataContext);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container style={{ marginTop: 28 }}>
          {archiveNotes.map((archive) => (
            <Grid item key={archive.id}>
              <Archive note={archive} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ArchiveNotes;

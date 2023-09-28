import React from "react";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import { Box } from "@mui/material";
import SwipeDrawer from "./SwipeDrawer";
import Notes from "./Notes/Notes";
import DeletedNotes from "./delete/DeleteNotes";
import ArchiveNotes from "./archive/ArchiveNotes";
import Reminder from "./notification/Reminder";


const Home = () => {
  return (
    <Box style={{ display: 'flex', width:'100%' }}>
      {/* multiple parents component ko aik sth return krny k liye <></> ka use otherwise not possible */}
       <Router>
      <SwipeDrawer />
      <Routes>
      <Route path="/" element={  <Notes /> } />
      <Route path="/archive" element={  <ArchiveNotes /> } />
      <Route path="/delete" element={  <DeletedNotes /> } />
      <Route path="/notification" element={ <Reminder/> } />
      </Routes>
      </Router>
    
    </Box>
  );
};

export default Home;

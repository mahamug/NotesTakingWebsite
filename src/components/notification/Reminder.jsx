import React, { useState, useEffect } from 'react';
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import io from 'socket.io-client';
import { toast } from "react-toastify";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Reminder = () => {
  const [notifications, setNotifications] = useState(JSON.parse(localStorage.getItem("notifications")) ||[]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to server from reminder.");
    });
    socket.on("notification", ({ message }) => {
      // Update notifications state when a notification is received
      setNotifications(prevNotifications => [...prevNotifications, message]);
    });
 
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>
      <h2>Notifications</h2>
      <p>Notification Count: {notifications.length}</p>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
      </Box>
    </Box>
  );
};

export default Reminder;

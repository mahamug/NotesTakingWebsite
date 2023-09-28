import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import io from "socket.io-client";
import { DataContext } from "../../context/DataProvider";

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Reminder = () => {
  const { notifications, setNotifications } = useContext(DataContext);

  useEffect(() => {
    console.log("Reminder component mounted.");
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to server from reminder.");
    });
    socket.on("notification", ({ message }) => {
      console.log("Received notification:", message);
      setNotifications((prevNotifications) => {
        console.log("Previous notifications:", prevNotifications);
        return [...prevNotifications, message];
      });
    });

    console.log("Rendering notifications:", notifications);

    console.log("Mapping notifications:", notifications);

    return () => {
      socket.disconnect();
      console.log("Disconnected from server.");
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <div>
          <h2>Notifications</h2>
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

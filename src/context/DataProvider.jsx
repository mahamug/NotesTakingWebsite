import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const [archiveNotes, setArchiveNotes] = useState(
    JSON.parse(localStorage.getItem("archiveNotes")) || []
  );
  const [deletedNotes, setDeletedNotes] = useState(
    JSON.parse(localStorage.getItem("deletedNotes")) || []
  );
  const [editedNote, setEditedNote] = useState(
    JSON.parse(localStorage.getItem("editedNote")) || []
  );
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) || []
  );
  const [notificationCount, setNotificationCount] = useState(
    Number(localStorage.getItem("notificationCount")) || 0
  );
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("archiveNotes", JSON.stringify(archiveNotes));
  }, [archiveNotes]);
  useEffect(() => {
    localStorage.setItem("deletedNotes", JSON.stringify(deletedNotes));
  }, [deletedNotes]);
  useEffect(() => {
    localStorage.setItem("editedNote", JSON.stringify(editedNote));
  }, [editedNote]);
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);
  useEffect(() => {
    localStorage.setItem("notificationCount", notificationCount.toString());
  }, [notificationCount]);
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to server from data provider.");
    });

    socket.on("notification", ({ message }) => {
      console.log("Received notification:", message);
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      setNotificationCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from server.");
    };
  }, []);

  return (
    <DataContext.Provider
      value={{
        notes,
        setNotes,
        archiveNotes,
        setArchiveNotes,
        deletedNotes,
        setDeletedNotes,
        editedNote,
        setEditedNote,
        notifications,
        setNotifications,
        notificationCount,
        setNotificationCount,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;

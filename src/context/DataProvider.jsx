import { createContext, useState, useEffect } from "react";

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;

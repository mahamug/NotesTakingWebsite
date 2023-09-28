const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const schedule = require("node-schedule");
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const reminders = [];
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  socket.on("setReminder", ({ note, selectedDate }) => {
    // Store the reminder in memory
    reminders.push({ socketId: socket.id, note, selectedDate });
    scheduleReminder(note, selectedDate, socket.id);
  });
  function scheduleReminder(note, selectedDate, socketId) {
    // Parse the selectedDate to a Date object
    const reminderDate = new Date(selectedDate);
  
    // Schedule a notification using node-schedule
    schedule.scheduleJob(reminderDate, () => {
      // Emit a notification event to the specific socket
      io.to(socketId).emit("notification", { message: "Reminder: " + note });
      console.log("Notification sent by socket: " + socketId);
    });
  }

 
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
server.listen(3001, () => {
  console.log("server is running ");
});

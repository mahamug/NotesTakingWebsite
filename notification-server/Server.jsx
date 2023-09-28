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
    reminders.push({ socketId: socket.id, note, selectedDate });
    console.log("Socket ID before calling scheduleReminder:", socket.id);
    scheduleReminder(note, selectedDate, socket);
  });
  function scheduleReminder(note, selectedDate, socket) {
    const reminderDate = new Date(selectedDate);
    const currentTime = new Date();

    console.log("Scheduled Time:", reminderDate);
    console.log("Current Time:", currentTime);

    if (reminderDate > currentTime) {
      schedule.scheduleJob(reminderDate, () => {
        console.log("Emitting notification:", "Reminder:", note);
        socket.emit("notification", { message: "Reminder: " + note });
        console.log("Notification sent by socket: " + socket.id);
      });
    } else {
      console.log("Scheduled time is in the past, no job scheduled.");
    }
  }

  socket.emit("notification", {
    message: "Reminder: server se emit ho rha client listen nhi kr rha obje ",
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
server.listen(3001, () => {
  console.log("server is running ");
});

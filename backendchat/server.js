const faker = require("faker");
const app = require("./app");
const { connectDB } = require("./Services/Database");
const MessageModel = require("./Model/Message");
const PORT = 3000;
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173  ",
  },
});
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("User connected to the server");
  const randomName = faker.name.findName();
  socket.emit("set-username", randomName);
  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
  socket.on("message", (data) => {
    console.log("🚀 ~ file: server.js:21 ~ socket.on ~ data:", data);
    const newMessage = new MessageModel(data);
    newMessage.save();

    socket.broadcast.emit("message", data.message);
  });
});
connectDB();
http.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});

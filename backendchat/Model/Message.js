const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name: String,
  message: String,
  time: String,
});

const MessageModel = new mongoose.model("message", messageSchema);
module.exports = MessageModel;

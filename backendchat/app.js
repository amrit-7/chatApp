const express = require("express");
const cors = require("cors");
const MessageModel = require("./Model/Message");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/messages", async (req, res) => {
  const messages = await MessageModel.find({});
  res.json(messages);
});

module.exports = app;

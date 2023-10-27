const mongoose = require("mongoose");
const mongoDBurl = "mongodb://localhost:27017/chatapp";
mongoose.connection.once("open", () => {
  console.log("Database Connected Successfully");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});
async function connectDB() {
  try {
    await mongoose.connect(mongoDBurl, {
      useNewUrlParser: true,
      family: 4,
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
async function disconnectDB() {
  await mongoose.disconnect(mongoDBurl);
}
module.exports = { connectDB, disconnectDB };

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conversationRoutes = require("./routes/conversation");
const messageRoutes = require("./routes/message");
const userRoutes = require("./routes/user");
// const profileRoutes = require("./routes/profile");
// const path = require("path");
var cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

// app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/conversations/", conversationRoutes);
app.use("/api/conversations/", messageRoutes);
app.use("/api/auth", userRoutes);
// app.use("/api/auth", profileRoutes);

module.exports = app;

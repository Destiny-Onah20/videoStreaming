const express = require("express");
const http = require("http")
const expressSession = require("express-session");
const adminRoute = require("./routers/admin.route");
const fileUpload = require("express-fileupload");
const videoRoute = require("./routers/video.route");
const userRoute = require("./routers/users.route");
const commentRoute = require("./routers/comment.route");

const app = express();
app.use(express.json());
app.use(expressSession({
  key: "user_id",
  resave: true,
  secret: "process.env.SESSION_SEC",
  saveUninitialized: true
}));

app.use(fileUpload({
  useTempFiles: true
}));

app.use("/api", adminRoute);
app.use("/api", videoRoute);
app.use("/api", userRoute);
app.use("/api", commentRoute);

const Server = http.createServer(app)




module.exports = Server;